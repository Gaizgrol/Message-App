// Lida com lançamento de erros em funções async, tratando devidamente os
// rejects das Promises evitando disparo de avisos/erros de unhandledRejection
const wrap = ( routeHandler ) => async ( req, res, next ) =>
{
    try {
        await routeHandler( req, res, next );
    }
    catch( err )
    {
        console.error( err );
        
        if ( res.headersSent )
            return next( err );

        return res.status( 500 ).json( { error: `${ err.message ?? err }` } );
    };
}

module.exports = { wrap };
