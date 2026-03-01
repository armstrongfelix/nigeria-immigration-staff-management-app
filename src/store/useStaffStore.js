import { create } from "zustand";
import { mockStaff } from "../data/mockStaff";

const useStaffStore = create((set, get) => ({
  staff: mockStaff,

  addStaff: (newStaff) =>
    set((state) => ({
      staff: [
        ...state.staff,
        {
          ...newStaff,
          id: state.staff.length + 1,
          name: `${newStaff.firstName} ${newStaff.lastName}`,
          yearsInService:
            new Date().getFullYear() -
            new Date(newStaff.dateOfEnlistment).getFullYear(),
          serviceNumber: `NIS/${String(new Date(newStaff.dateOfEnlistment).getFullYear()).slice(2)}/${String(state.staff.length + 1).padStart(4, "0")}`,
          training: [],
        },
      ],
    })),

  getStaffById: (id) => {
    const state = get();
    return state.staff.find((s) => s.id === Number(id));
  },

  getTotalCount: () => get().staff.length,
  getActiveCount: () => get().staff.filter((s) => s.status === "Active").length,
  getNearRetirement: () =>
    get().staff.filter((s) => s.status === "Retired Soon").length,
  getOnLeaveCount: () =>
    get().staff.filter((s) => s.status === "On Leave").length,
}));

export default useStaffStore;
