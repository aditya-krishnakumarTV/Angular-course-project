import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipeComponent } from "./pages/recipe/recipe.component";
import { ShoppingListComponent } from "./pages/shopping-list/shopping-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipe', pathMatch: 'full' },

    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'recipe', component: RecipeComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }