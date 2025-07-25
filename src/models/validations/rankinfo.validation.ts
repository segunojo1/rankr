import z from "zod";

export const RankInfoSchema = z.object({
    rank_title: z.string().min(2),
    rank_desc: z.string(),
    campus: z.string()
})