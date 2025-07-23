import os
import uuid
import xmltodict
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY in environment variables")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def extract_name(entity):
    # Handles NonIndividualName for MainEntity or IndividualName for LegalEntity
    if 'NonIndividualName' in entity:
        return entity['NonIndividualName'].get('NonIndividualNameText')
    elif 'IndividualName' in entity:
        ind = entity['IndividualName']
        # Combine GivenName(s) and FamilyName
        given_names = ind.get('GivenName')
        if isinstance(given_names, list):
            given = " ".join(given_names)
        else:
            given = given_names or ""
        family = ind.get('FamilyName') or ""
        full_name = (given + " " + family).strip()
        return full_name if full_name else None
    return None

def extract_address(entity):
    addr = entity.get('BusinessAddress', {}).get('AddressDetails', {})
    state = addr.get('State')
    postcode = addr.get('Postcode')
    return state, postcode

def parse_and_upload(xml_file):
    with open(xml_file, "rb") as f:
        doc = xmltodict.parse(f)

    # ABR elements are in doc['Transfer']['ABR'], which can be a list or single dict
    abrs = doc['Transfer'].get('ABR')
    if not abrs:
        print("No ABR records found in XML.")
        return

    if not isinstance(abrs, list):
        abrs = [abrs]

    for abr in abrs:
        abn = abr.get('ABN', {}).get('#text')
        gst_info = abr.get('GST')
        gst_status = gst_info.get('@status') if gst_info else None
        last_updated = abr.get('@recordLastUpdatedDate')  # attribute

        # Entity can be MainEntity or LegalEntity
        entity = abr.get('MainEntity') or abr.get('LegalEntity')
        if not entity:
            # skip if no entity info
            continue

        name = extract_name(entity)
        state, postcode = extract_address(entity)

        if not abn or not name:
            # skip incomplete records
            continue

        data = {
            "id": str(uuid.uuid4()),
            "abn": abn,
            "name": name,
            "gst": gst_status,
            "record_last_updated": last_updated,
            "address_state": state,
            "address_postcode": postcode,
        }

        try:
            supabase.table("businesses").insert(data).execute()
            print(f"Inserted: {name}")
        except Exception as e:
            print(f"Error inserting {name}: {e}")

if __name__ == "__main__":
    parse_and_upload("20250716_Public01.xml")
