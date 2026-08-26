import { cn } from "@/lib/utils"

type props={
    className?:string,  
     children:React.ReactNode
}
export default function Card({ children ,className}:props) {
    return (
            <div className={cn("p-6 rounded-xl border bg-white text-card-foreground ",className)}>
                {children}
            </div>  
    )
}