export default (() => ({
        _requestData : {},
        withRequestData(data:any){
                if(typeof data === 'object' && data !== null)
                this._requestData = { ...this._requestData, ...data}
                return this;
        },
    }))();
