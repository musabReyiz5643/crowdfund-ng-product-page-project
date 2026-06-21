import type { DataType } from "@/shared/types/data/data"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useUpdateData = () => {

    const queryClient = useQueryClient()

    const mutationOptions = useMutation({

        mutationFn: async () => {
            return "success"
        },

        onSuccess: (_, variables: { selectedPledge: "BambooStand" | "BlackEdition" | "MahoganyEdition", pledgeAmount: number }) => {

            const currentData = queryClient.getQueryData<DataType>(["getData"])

            if (!currentData) return

            queryClient.setQueryData<DataType>(["getData"], {
                ...currentData,
                header: {
                    ...currentData.header,
                    totalBacked: currentData.header.totalBacked + variables.pledgeAmount,
                    totalBackers: currentData.header.totalBackers + 1
                },
                stands: {
                    ...currentData.stands,
                    [variables.selectedPledge]: {
                        stock: currentData.stands[variables.selectedPledge].stock - 1
                    },
                }
            })
        }
    })

    const mutationNoReward = useMutation({
        mutationFn: async () => {
            return "Success"
        },

        onSuccess: (_, variables: { pledgeAmount: number }) => {

            const currentData = queryClient.getQueryData<DataType>(["getData"])

            if (!currentData) return

            queryClient.setQueryData<DataType>(["getData"], {
                ...currentData,
                header: {
                    ...currentData.header,
                    totalBacked: currentData.header.totalBacked + variables.pledgeAmount,
                    totalBackers: currentData.header.totalBackers + 1
                },
            })
        }
    })

    return {
        mutationNoReward,
        mutationNoRewardPending: mutationNoReward.isPending,
        mutationOptions,
        mutationOptionsPending: mutationOptions.isPending
    }
}