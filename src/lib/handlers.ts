export const getGstStatusDisplay = (gstStatus: string) => {
  switch (gstStatus) {
    case "CAN":
      return { label: "Cancelled", className: "bg-red-100 text-red-800" };
    case "NON":
      return {
        label: "Not Registered",
        className: "bg-gray-100 text-gray-800",
      };
    default:
      return { label: "Active", className: "bg-green-100 text-green-800" };
  }
};
