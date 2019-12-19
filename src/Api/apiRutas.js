// --- DNS - direcciones api de los servidores
const DNS = {
    smart: '190.145.56.148',
    smartlocal: '192.168.3.128',
    configlogin: '190.145.56.148'
};


// --- Puertos de las api
const PORT = {
    confmobi: '8090',
    conflogin: '8091',
};

/**
 * Construccion de rutas de la API
 */
export const ROUTES = {

    // ------------------------ CONFIGURACION  ----------------------------------------

    /**
   * @url /confmobi/getConfi
   * @desc api para obtener un cliente concatenando el ID
   */
    CONFIG: `http://${DNS.smart}:${PORT.confmobi}/confmobi/getConfi/`,
    LOGIN:  `http://${DNS.configlogin}:${PORT.conflogin}/usermana/authentiMobi`,
     
    // ------------------------ OPTIONS  ----------------------------------------

    /**
   * @url /confmobi/getConfi
   * @desc api para obtener un cliente concatenando el ID
   */
   OPTION: `http://${DNS.smart}:${PORT.confmobi}/puntatpa/getPuntatpa`,
   UPOPTION: `http://${DNS.smart}:${PORT.confmobi}/puntatpa/actucomo`,
   DELOPTION: `http://${DNS.smart}:${PORT.confmobi}/puntatpa/remoComo`,
   CREATEOPTION: `http://${DNS.smart}:${PORT.confmobi}/puntatpa/creacomo`

}