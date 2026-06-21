import z from "zod";

export const SelectPledgesSchema = (minAmount: number) =>
    z.object({
        pledgeAmount: z.coerce.number().min(minAmount, {
            message: `En az $${minAmount} girmelisin`
        })
    })

export type SelectPledgesSchemaType = z.infer<ReturnType<typeof SelectPledgesSchema>>