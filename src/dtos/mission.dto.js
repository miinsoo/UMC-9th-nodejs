export const createMissionRequest = (body) => {
    return {
        storeId: body.storeId,
        minPaymentAmount: body.min_payment_amount,
        rewardPoints: body.reward_points,
        deadline: body.deadline,
    }    
};

export const createMissionResponse = (review) => {
    return {
        missionId: mission.mission_id,
        storeId: mission.store_id,
        minPaymentAmount: mission.min_payment_amount,
    };
};