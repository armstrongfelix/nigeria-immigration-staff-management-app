import { useQuery } from "@tanstack/react-query";
import useStaffStore from "../store/useStaffStore";

function simulateFetch(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 300);
  });
}

export function useStaffList() {
  const staff = useStaffStore((state) => state.staff);

  return useQuery({
    queryKey: ["staff", staff.length],
    queryFn: () => simulateFetch(staff),
    initialData: staff,
  });
}

export function useStaffById(id) {
  const getStaffById = useStaffStore((state) => state.getStaffById);

  return useQuery({
    queryKey: ["staff", id],
    queryFn: () => simulateFetch(getStaffById(id)),
    enabled: !!id,
  });
}
