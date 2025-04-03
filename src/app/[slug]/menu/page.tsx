import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ConsumptionMethod } from "@prisma/client";
import { ChevronsLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface RestaurantMenuPageProps {
    params: Promise<{slug: string}>
    searchParams: Promise<{consumptionMethod: string}>
}

const isConsumptionMethodValid = (ConsumptionMethod: string) =>{
    return ["DINE_IN", "TAKEAWAY"].includes(ConsumptionMethod.toUpperCase());
}

const RestaurantMenuPage = async ({params,searchParams}:RestaurantMenuPageProps) => {
    const {slug} = await params;
    const {consumptionMethod} = await searchParams;
    if(!isConsumptionMethodValid(consumptionMethod)){
        return notFound();
    }
    const restaurant = await db.restaurant.findUnique({ where: { slug } });
    if (!restaurant){
        return notFound
    }
    return (
        <div>
            <div className="relative h-[250px] w-full">
                <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 z-50 rounded-full" 
               
                >
                    <ChevronsLeftIcon />

                </Button>
                <Image
                src={restaurant?.coverImageUrl} 
                alt={restaurant.name} 
                fill
                className="object-cover"
                />
                  <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 z-50 rounded-full" 

                >
                    <ScrollTextIcon />

               </Button>
            </ div>
        </div>
     );
}
 
export default RestaurantMenuPage ;