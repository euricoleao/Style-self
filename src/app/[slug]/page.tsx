

import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import ConsumptionMethodOption from "./components/comsumption-method-option";
//import { getRestaurantBySlug } from "../data/get-restaurant-by-slug";

interface RestaurantPageProps {
    params: Promise<{ slug: string }>
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
    const { slug } = await params;
    const restaurant = await db.restaurant.findUnique({ where: { slug } });
    if (!restaurant) {
        return notFound()
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center px-6 pt-24" >
            {/* LOGO E TUTULO */}
            <div className="flex flex-col items-center gap-2">
                <Image src={restaurant?.avatarImageUrl}
                    alt={restaurant?.name}
                    width={82}
                    height={82}
                />
                <h2 className="font-semibold">{restaurant.name} </h2>
            </div>
            {/* BEM VINDO */}
            <div className="pt-24 text-center space-y-2">
                <h3 className="text-2xl font-semibold">
                    Seja bem-vindo!
                </h3>
                <p className=" opacity-55">
                    Escolha como prefere aproveitar sua refeição. Estamos
                    oferecendo praticidade e sabor em cada detalhe!
                </p>
            </div>
            <div className="pt-14 grid grid-cols-2 gap-4">
                <ConsumptionMethodOption
                    option="DINE_IN"
                    slug={slug}
                    buttonText="Para comer aqui"
                    imageAlt="Comer aqui"
                    imageUrl="/dine_in.jpg"

                />
                <ConsumptionMethodOption
                     option="TAKEAWAY"
                     slug={slug}
                    buttonText="Para levar"
                    imageAlt="Para levar"
                    imageUrl="/to_take.jpeg"

                />
                {/* <Card>
                    <CardContent className="flex flex-col items-center gap-8 py-8 ">
                        <div className="relative h-[80px] w-[80px]  ">
                        <Image src="/dine_in.jpg"
                              fill alt="para comer aqui"
                              className="object-contain" />
                           </div>
                              
                        <Button variant="secondary" className="rounded-full">
                            Para comer aqui
                        </Button>
                       
                    </CardContent>

                </Card>

                <Card>
                    <CardContent className="flex flex-col items-center gap-8 py-8 ">
                    <div className="relative h-[80px] w-[80px]  ">
                        <Image src="/to_take.jpeg" fill
                               alt="para levar" 
                               className="object-contain"
                               />
                       </div>     
                        <Button variant="secondary" className="rounded-full">
                            Para levar
                        </Button>
                       
                    </CardContent>

                </Card>
 */}




            </div>
        </div>

    );
}




export default RestaurantPage;