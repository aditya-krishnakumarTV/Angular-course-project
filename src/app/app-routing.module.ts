import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipeComponent } from "./pages/recipe/recipe.component";
import { RecipeStartComponent } from "./pages/recipe/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./pages/recipe/recipe-detail/recipe-detail.component";
import { ShoppingListComponent } from "./pages/shopping-list/shopping-list.component";
import { RecipeEditComponent } from "./pages/recipe/recipe-edit/recipe-edit.component";

import { RecipeResolverService } from "./services/recipe-resolver.service";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipe', pathMatch: 'full' },

    { path: 'shopping-list', component: ShoppingListComponent },
    {
        path: 'recipe', component: RecipeComponent, children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }