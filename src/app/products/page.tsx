import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const ProductsPage = () => {
    return (
        <div className="p-5 border flex-1 justify-center text-center  border-red-500 rounded-xl">
            <h1 className="text-red-500 ">ProductsPage</h1>
            <Button className="mb-2">Active</Button>
            <Input  placeholder="Project style self"/>
        </div>)
}

export default ProductsPage;