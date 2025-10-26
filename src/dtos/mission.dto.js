export const createMissionRequest = (body) => {
    console.log("createMissionRequest body:", body);
    return {
        storeId: body.store_id,
        minPaymentAmount: body.min_payment_amount,
        rewardPoints: body.reward_points,
        deadLine: body.dead_line,
    }    
};

export const getMissionByStoreIdRequest = (params) => {
    return {
        storeId: Number(params.storeId),
    };
}

export const createMissionResponse = (mission) => {
    return {
        missionId: mission.id,
        storeId: mission.storeId,
        minPaymentAmount: mission.minPaymentAmount,
    };
};

export const getMissionByStoreIdResponse = (mission) => {
    return {
        missionId: mission.id,
        storeId: mission.storeId,
        rewardPoints: mission.rewardPoints,
        deadLine: mission.deadLine,
        minPaymentAmount: mission.minPaymentAmount,
    };
};