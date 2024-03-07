/**
 * Handle data to make it more beaty
 * @param {*} product 
 * @returns 
 */
export const handleProductData = product => {
    const { name, address, image, slot, ward, district } = product.productId
    const type = product.name
    const id = product._id
    const { led, pump, door, airTemperature, airHumidity, 
            soilMoisture, ledAutomatic, pumpAutomatic } = product
    return { 
        id, name, address, image, slot, type, ward, district,
        device: {
            led, pump, door, airTemperature, airHumidity, 
            soilMoisture, ledAutomatic, pumpAutomatic
        }
    }
}