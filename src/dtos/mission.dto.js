export const createMissionRequest = (body) => {
    console.log("createMissionRequest body:", body);
    return {
        storeId: body.store_id,
        minPaymentAmount: body.min_payment_amount,
        rewardPoints: body.reward_points,
        deadLine: body.dead_line,
    }    
};

export const createMissionResponse = (mission) => {
    return {
        missionId: mission.missionId,
        storeId: mission.storeId,
        minPaymentAmount: mission.minPaymentAmount,
    };
};