import {useAuthStore} from '../../stores/Auth';
import router from '../../router/index';

function BeforeGuard($router) {
    $router.beforeEach(async (to,from) => {
        let auth = useAuthStore();
        if (to.meta.requiredAuth) {
            if (  ! auth.isAuthed()  )  {
                if ( ! auth.hasToken() ) {
                    return {name: "login"};
                } else {
                    await auth.getAuthIfExist().then((response) => {
                        auth.$state.user = response.data.data.me;
                        auth.$state.fetch = false;
                        if ( ! response.data.data.me ) {
                            return router.push({name: 'login'});  
                        } 

                        if ( auth.$state.user.role) {
                            auth.myPriviledges(auth.$state.user.role.priviledges);
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