import { IAddStudentPlanSchema, IWorkoutSeriesSchema } from "@/types"

export const workoutFormValues: IWorkoutSeriesSchema = {
    workoutData: [
        {
            exerciseName: {
                value: "",
                label: "",
            },
            repsQuantity: {
                value: "",
                label: "",
            },
            seriesQuantity: {
                value: "",
                label: "",
            },
            weightQuantity: "",
        },
    ],
}

export const studentPlanFormValues: IAddStudentPlanSchema = {
    workoutData: [
        {
            exerciseName: {
                value: "",
                label: "",
            },
            repsQuantity: {
                value: "",
                label: "",
            },
            seriesQuantity: {
                value: "",
                label: "",
            },
            weightQuantity: "",
        },
    ],
    userData: {
        value: "",
        label: "",
    },
}
