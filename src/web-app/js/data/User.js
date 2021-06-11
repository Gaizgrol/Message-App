class User
{
    /**
     * @param { string } name 
     * @param { number } id 
     */
    constructor( name, id )
    {
        this._name = name;
        this._id = id;
    }

    get id()
    {
        return this._id;
    }

    get name()
    {
        return this._name;
    }
}