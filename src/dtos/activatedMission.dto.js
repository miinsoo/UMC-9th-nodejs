export const createActivatedMissionRequest = (body, userId) => {
  return {
    missionId: body.mission_id,
    userId: BigInt(userId),
  };
};

export const getActivatedMissionRequest = (userId) => {
  return {
    userId: BigInt(userId),
  };
};

export const completeActivatedMissionRequest = (body, userId) => {
  return {
    ActivatedMissionId: body.activated_mission_id,
    userId: BigInt(userId),
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