import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Company } from "../app/type";
import { EMPLOYEE_RANGES } from "../app/constants";

interface Filters {
  name: string;
  industry: string;
  employeeRange: null | (typeof EMPLOYEE_RANGES)[number];
}

export function useCompanies(filters: Filters, hasSearched: boolean) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasSearched) return;
    setLoading(true);
    const fetchCompanies = async () => {
      let query = supabase.from("Companies").select("*");

      if (filters.name) query = query.ilike("name", `%${filters.name}%`);
      if (filters.industry) query = query.eq("industry", filters.industry);
      if (filters.employeeRange)
        query = query
          .gte("num_employees", filters.employeeRange.min)
          .lte("num_employees", filters.employeeRange.max);

      const { data, error } = await query;
      if (!error && data) setCompanies(data as Company[]);
      else setCompanies([]);
      setLoading(false);
    };
    fetchCompanies();
  }, [filters, hasSearched]);

  return { companies, loading };
}
