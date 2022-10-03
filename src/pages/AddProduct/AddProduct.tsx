import { useEffect, useState } from "react"
import { getTodayProduct } from "@/api/foodProductsApi/getTodayProducts"
import { MEAL_TYPES } from "@/enums"
import { IProductsSummary, ITodayProducts } from "@/types"
import { AddProductForm } from "./components"

const AddProduct = () => {
    const [newlyAddedProductName, setNewlyAddedProductName] = useState("")
    const [removedProductId, setRemovedProductId] = useState("")

    const [todayProductsData, setTodayProductsData] = useState<{
        todayProducts?: ITodayProducts
        todaySummary?: IProductsSummary
        allDayMealsId?: string
    }>()

    useEffect(() => {
        const fetchTodayProduct = async () => {
            const products = await getTodayProduct()

            setTodayProductsData({
                todayProducts: products.todayUserProducts,
                todaySummary: products.dailySummary,
                allDayMealsId: products?.todayUserProducts?.id,
            })
        }

        fetchTodayProduct()
    }, [newlyAddedProductName, removedProductId])

    const { breakfast, brunch, dinner, dessert, supper } = todayProductsData?.todayProducts ?? {}

    const { totalKcal, totalProteins, totalFat, totalCarbons } =
        todayProductsData?.todaySummary ?? {}

    const handleSetNewlyAddedProductName = (newProductName: string) => {
        setNewlyAddedProductName(newProductName)
    }
    const handleSetRemovedProductId = (productId: string) => {
        setRemovedProductId(productId)
    }

    return (
        <div className="bg-offWhite flex justify-center">
            <div>
                <AddProductForm
                    timeOfTheMeal={MEAL_TYPES.BREAKFAST}
                    title="Śniadanie"
                    alreadyAddedProducts={breakfast}
                    handleSetNewlyAddedProductName={handleSetNewlyAddedProductName}
                    allDayMealsId={todayProductsData?.allDayMealsId}
                    handleSetRemovedProductId={handleSetRemovedProductId}
                />
                <AddProductForm
                    timeOfTheMeal={MEAL_TYPES.BRUNCH}
                    title="Drugie Śniadanie"
                    alreadyAddedProducts={brunch}
                    handleSetNewlyAddedProductName={handleSetNewlyAddedProductName}
                    allDayMealsId={todayProductsData?.allDayMealsId}
                    handleSetRemovedProductId={handleSetRemovedProductId}
                />
                <AddProductForm
                    timeOfTheMeal={MEAL_TYPES.DINNER}
                    title="Obiad"
                    alreadyAddedProducts={dinner}
                    handleSetNewlyAddedProductName={handleSetNewlyAddedProductName}
                    allDayMealsId={todayProductsData?.allDayMealsId}
                    handleSetRemovedProductId={handleSetRemovedProductId}
                />
                <AddProductForm
                    timeOfTheMeal={MEAL_TYPES.DESSERT}
                    title="Podwieczorek"
                    alreadyAddedProducts={dessert}
                    handleSetNewlyAddedProductName={handleSetNewlyAddedProductName}
                    allDayMealsId={todayProductsData?.allDayMealsId}
                    handleSetRemovedProductId={handleSetRemovedProductId}
                />
                <AddProductForm
                    timeOfTheMeal={MEAL_TYPES.SUPPER}
                    title="Kolacja"
                    alreadyAddedProducts={supper}
                    handleSetNewlyAddedProductName={handleSetNewlyAddedProductName}
                    allDayMealsId={todayProductsData?.allDayMealsId}
                    handleSetRemovedProductId={handleSetRemovedProductId}
                />
            </div>
            <div className="ml-16">
                <h3 className="text-xl mb-4">Podsumowanie dzisiejszego dnia:</h3>
                <p>Kcal: {totalKcal?.toFixed(2)}</p>
                <p>Białko: {totalProteins?.toFixed(2)}</p>
                <p>Tłuszcz: {totalFat?.toFixed(2)}</p>
                <p>Węglowodany: {totalCarbons?.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default AddProduct
