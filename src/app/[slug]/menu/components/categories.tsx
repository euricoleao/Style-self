"use client"

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {  Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Products from "./products";


interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
     include: {
        MenuCategories:{
            include:{
                products:true,
            }
        }
     }
    }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
    include:{products: true};
}>;

const  RestaurantCategories = ({restaurant}: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategoriesWithProducts>(
        restaurant.MenuCategories[0])
    const handleCategoryClick = (category:MenuCategoriesWithProducts) => {
        setSelectedCategory(category)
}

const getCategoryButtonVariant = (category:MenuCategoriesWithProducts) => {
   return selectedCategory.id === category.id ? "default" : "secondary"
}
    
    return ( 
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-slate-400 ">
          <div className="p-3"> 
           <div className="flex items-center gap-3 ">
            <Image 
            src={restaurant.avatarImageUrl } 
            alt={restaurant.name} 
            height={45} 
            width={45} />
            <div>
                <h2 className="font-semibold text-lg">{restaurant.name} </h2>
                <p className="text-xs opacity-55">{restaurant.description}</p>
            </div>
           
           </div>
           <div className="flex items-center gap-1 text-xs text-green-700 mt-3">
          <ClockIcon size={12}/>
          <p>Aberto!</p>
      </div>
      </div>
      <ScrollArea className="w-full px-1 pt-0">
        <div className="flex w-max space-x-4 px-4 pt-0 " >
         {restaurant.MenuCategories.map(category => (
           <Button 
           onClick={() => handleCategoryClick(category)} 
           key={category.id} variant={
           getCategoryButtonVariant(category)
           } size="sm" className="rounded-full text-xs">
             {category.name}
           </Button>
         ))}
        </div>
        <ScrollBar orientation="horizontal"/>

      </ScrollArea>
       <h3 className="px-5 font-semibold pt-8">{selectedCategory.name} </h3>
      <Products products={selectedCategory.products} />
     
        </div>
       
     );
};
 
export default RestaurantCategories ;