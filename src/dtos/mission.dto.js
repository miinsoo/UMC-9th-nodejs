export const createMissionRequest = (body) => {
    console.log("createMissionRequest body:", body);
    return {
        storeId: body.store_id,
        minPaymentAmount: body.min_payment_amount,
        rewardPoints: body.reward_points,
        deadline: body.deadline,
    }    
};

export const createMissionResponse = (mission) => {
    return {
        missionId: mission.mission_id,
        storeId: mission.store_id,
        minPaymentAmount: mission.min_payment_amount,
    };
};