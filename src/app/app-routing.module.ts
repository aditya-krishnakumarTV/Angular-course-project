import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipe', pathMatch: 'full' },
    {
        path: 'recipe',
        loadChildren: () => import('./pages/recipe/recipe.module').then(m => m.RecipeModule)
    },
    {
        path: 'shopping-list',
        loadChildren: () => import('./pages/shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }