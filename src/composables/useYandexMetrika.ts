

const useYandexMetrika = () => {
    // $ym.prototype.reachGoal = function() {
    //     console.log("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
    // };
    //
    const { $ym } = useNuxtApp()
    return $ym

}
export default useYandexMetrika
class YMetrika {
    public reachGoal(target:string):this{
        const { $ym } = useNuxtApp()
        if(!$ym) throw new Error('not set Yandex metrika')
        $ym( 'reachGoal', target)
        return this;
    }
}

export const YandexMetrika = new YMetrika();
