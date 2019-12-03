// --- DNS - direcciones api de los servidores
const DNS = {
    smart: '192.168.3.128',
    smartlocal: '192.168.3.128',
};



// --- Puertos de las api
const PORT = {
    confmobi: '8090',
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
    CONFIG: `http://${DNS.smart}:${PORT.confmobi}/confmobi/getConfi/`
}