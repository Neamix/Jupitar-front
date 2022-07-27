import {useAuthStore} from '../../stores/Auth';
import router from '../../router/index';
import { useGuardStore } from '../../stores/Guard';

function BeforeGuard($router) {
    $router.beforeEach(async (to,from) => {
        let auth = useAuthStore();
        let guard = useGuardStore();
        if (to.meta.requiredAuth) {
            if (  ! auth.isAuthed()  )  {
                if ( ! auth.hasToken() ) {
                    return {name: "login"};
                } else {
                    await auth.getAuthIfExist().then((response) => {
                        auth.$state.user = response.data.data.me;
                        guard.$state.priviledges = response.data.data.me.role.priviledges;
                        auth.$state.fetch = false;
                        if ( ! response.data.data.me ) {
                            return router.push({name: 'login'});  
                        } 

                        if ( auth.$state.user.role) {
                            // console.log(guard.$state.priviledges)
                            let hasPriviledge = guard.hasPriviledges(to.name);
                            
                            if ( ! hasPriviledge ) {
                                return router.push({name: "notFound"})
                            }
                        }

                    });
                }
            }
        } else {
            auth.$state.fetch = false;
        }
    });
}

export default BeforeGuard;