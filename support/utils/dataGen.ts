export class DataGenerator {

    async RandomNumber(min: number = 1, max: number = 999999): Promise<number> {
        return Math.floor(Math.random() * (max - min + 1)) + min;
        
    }
}