


const id = '19981279';
export interface IYandexMetrika{
    // addFileExtension():this;
    // extLink():this;
    // file():this;
    // getClientID():this;
    // hit():this;
    // notBounce():this;
    // params():this;
    reachGoal():this;
    // replacePhones():this;
    // setUserID():this;
    // userParams():this;
}

export const useYandexMetrika = () => {
    // $ym.prototype.reachGoal = function() {
    //     console.log("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
    // };
    //
    const { $ym } = useNuxtApp()
    return $ym

}

class YMetrika {
    public reachGoal(target:string):this{
        const { $ym } = useNuxtApp()
        $ym( 'reachGoal', target)
        return this;
    }
}

export const YandexMetrika = new YMetrika();
