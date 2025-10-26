export const createActivatedMissionRequest = (body) => {
  return {
    missionId: body.mission_id,
    userId: body.user_id,
  };
};

export const getActivatedMissionRequest = (query) => {
  return {
    userId: Number(query.userId),
  };
};

export const completeActivatedMissionRequest = (body) => {
  return {
    ActivatedMissionId: body.activated_mission_id,
    userId: body.user_id,
  };
}

export const createActivatedMissionResponse = (activatedMission) => {
  return {
    userMissionId: activatedMission.userMissionId,
    missionId: activatedMission.missionId,
    userId: activatedMission.userId,
  };
};

export const getActivatedMissionResponse = (activatedMission) => {
  return {
    missionId: activatedMission.missionId,
    storeName: activatedMission.storeName,
    state: activatedMission.state,
    minPaymentAmount: activatedMission.minPaymentAmount,
    rewardPoints: activatedMission.rewardPoints,
    deadLine: activatedMission.deadLine,
  };
}

export const completeActivatedMissionResponse = (activatedMission) => {
  return {
    activatedMissionId: activatedMission.id,
    missionId: activatedMission.missionId,
    state: activatedMission.state,
  };
}