/* ============================================================
   LAB CONTROLS — a tiny mutable store the inspector writes to
   and every experiment reads each frame. No framework needed.
   ============================================================ */

export interface LabControls {
  speed: number; // 0.2 .. 2
  chaos: number; // 0 .. 1
  paused: boolean;
}

export const labControls: LabControls = {
  speed: 1,
  chaos: 0.5,
  paused: false,
};

export function resetLabControls(): void {
  labControls.speed = 1;
  labControls.chaos = 0.5;
  labControls.paused = false;
}
