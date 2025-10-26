export const createActivatedMissionRequest = (body) => {
  return {
    missionId: body.mission_id,
    userId: body.user_id,
  };
};

export const createActivatedMissionResponse = (activatedMission) => {
  return {
    userMissionId: activatedMission.userMissionId,
    missionId: activatedMission.missionId,
    userId: activatedMission.userId,
  };
};