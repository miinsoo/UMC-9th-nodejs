export const createActivatedMissionRequest = (body) => {
  return {
    missionId: body.mission_id,
    userId: body.user_id,
  };
};

export const createActivatedMissionResponse = (activatedMission) => {
  return {
    userMissionId: activatedMission.user_mission_id,
    missionId: activatedMission.mission_id,
    userId: activatedMission.user_id,
  };
};