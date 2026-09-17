<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CmsPageController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebsiteController;
use App\Models\Download;
use App\Models\News;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public API
Route::get('/api/homepage', [HomepageController::class, 'index'])->name('api.homepage');
Route::get('/api/products', [ProductController::class, 'apiIndex'])->name('api.products');
Route::get('/api/products/{slug}', [ProductController::class, 'apiShow'])->name('api.products.show');
Route::get('/api/news', [NewsController::class, 'apiIndex'])->name('api.news');
Route::get('/api/news/{slug}', [NewsController::class, 'apiShow'])->name('api.news.show');
Route::get('/api/downloads', [DownloadController::class, 'apiIndex'])->name('api.downloads');
Route::get('/api/pages/{page}', [CmsPageController::class, 'apiShow'])->name('api.pages');

// Public website (Inertia, root view public.blade.php)
Route::get('/', [WebsiteController::class, 'home'])->name('site.home');
Route::get('/profil', [WebsiteController::class, 'profil'])->name('site.profil');
Route::get('/mading', [WebsiteController::class, 'mading'])->name('site.mading');
Route::get('/mading/{slug}', [WebsiteController::class, 'madingShow'])->name('site.mading.show');
Route::get('/products', [WebsiteController::class, 'products'])->name('site.products');
Route::get('/products/{slug}', [WebsiteController::class, 'productShow'])->name('site.products.show');
Route::get('/downloads', [WebsiteController::class, 'downloads'])->name('site.downloads');
Route::get('/contact', [WebsiteController::class, 'contact'])->name('site.contact');
Route::get('/customer-service', [WebsiteController::class, 'informasi'])->name('site.informasi');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::delete('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('/account/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/account/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/account/password', [ProfileController::class, 'updatePassword'])->name('profile.password');

    Route::get('/dashboard', fn () => Inertia::render('Dashboard', [
        'title' => 'Dashboard CMS Sekolah',
        'stats' => [
            'programs' => Product::count(),
            'publishedPrograms' => Product::where('status', 'published')->count(),
            'mading' => News::count(),
            'publishedMading' => News::where('status', 'published')->count(),
            'documents' => Download::count(),
            'users' => User::count(),
        ],
    ]))
        ->middleware('permission:dashboard.view')
        ->name('dashboard');

    Route::get('/calendar', fn () => Inertia::render('Calendar', ['title' => 'Calendar']))->name('calendar');
    Route::get('/profile', fn () => Inertia::render('Profile', ['title' => 'Profile']))->name('profile');
    Route::get('/form-elements', fn () => Inertia::render('Form Elements', ['title' => 'Form Elements']))->name('form-elements');
    Route::get('/basic-tables', fn () => Inertia::render('Basic Tables', ['title' => 'Basic Tables']))->name('basic-tables');
    Route::get('/line-chart', fn () => Inertia::render('Line Chart', ['title' => 'Line Chart']))->name('line-chart');
    Route::get('/bar-chart', fn () => Inertia::render('Bar Chart', ['title' => 'Bar Chart']))->name('bar-chart');

    Route::prefix('tailadmin')->name('tailadmin.')->group(function () {
        Route::get('/blank', fn () => Inertia::render('Tailadmin/Blank'))->name('blank');
        Route::get('/error-404', fn () => Inertia::render('Tailadmin/Error404'))->name('error-404');
        Route::get('/alerts', fn () => Inertia::render('Tailadmin/Alerts'))->name('alerts');
        Route::get('/avatars', fn () => Inertia::render('Tailadmin/Avatars'))->name('avatars');
        Route::get('/badges', fn () => Inertia::render('Tailadmin/Badges'))->name('badges');
        Route::get('/buttons', fn () => Inertia::render('Tailadmin/Buttons'))->name('buttons');
        Route::get('/images', fn () => Inertia::render('Tailadmin/Images'))->name('images');
        Route::get('/videos', fn () => Inertia::render('Tailadmin/Videos'))->name('videos');
    });

    // Mading: dikelola Admin dan Guru (permission mading.*)
    Route::prefix('cms/news')->name('cms.news.')->group(function () {
        Route::get('/', [NewsController::class, 'index'])->middleware('permission:mading.view')->name('index');
        Route::post('/', [NewsController::class, 'store'])->middleware('permission:mading.create')->name('store');
        Route::put('/{news}', [NewsController::class, 'update'])->middleware('permission:mading.update')->name('update');
        Route::delete('/{news}', [NewsController::class, 'destroy'])->middleware('permission:mading.delete')->name('destroy');
    });

    Route::prefix('cms')->name('cms.')->middleware('role:admin')->group(function () {
        Route::get('/homepage', [HomepageController::class, 'edit'])->name('homepage');
        Route::put('/homepage', [HomepageController::class, 'update'])->name('homepage.update');

        Route::get('/products', [ProductController::class, 'index'])->name('products');
        Route::post('/products', [ProductController::class, 'store'])->name('products.store');
        Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

        Route::get('/warranty-check', fn () => Inertia::render('Cms/WarrantyCheck'))->name('warranty-check');

        Route::get('/downloads', [DownloadController::class, 'index'])->name('downloads');
        Route::post('/downloads', [DownloadController::class, 'store'])->name('downloads.store');
        Route::put('/downloads/{download}', [DownloadController::class, 'update'])->name('downloads.update');
        Route::delete('/downloads/{download}', [DownloadController::class, 'destroy'])->name('downloads.destroy');

        Route::get('/company', fn (CmsPageController $controller) => $controller->edit('company', 'Cms/Company'))->name('company');
        Route::put('/company', fn (CmsPageController $controller) => $controller->update(request(), 'company'))->name('company.update');

        Route::get('/customer-service', fn (CmsPageController $controller) => $controller->edit('customer_service', 'Cms/CustomerService'))->name('customer-service');
        Route::put('/customer-service', fn (CmsPageController $controller) => $controller->update(request(), 'customer_service'))->name('customer-service.update');

        Route::get('/contact', fn (CmsPageController $controller) => $controller->edit('contact', 'Cms/Contact'))->name('contact');
        Route::put('/contact', fn (CmsPageController $controller) => $controller->update(request(), 'contact'))->name('contact.update');

        Route::get('/global-settings', fn (CmsPageController $controller) => $controller->edit('global', 'Cms/GlobalSettings'))->name('global-settings');
        Route::put('/global-settings', fn (CmsPageController $controller) => $controller->update(request(), 'global'))->name('global-settings.update');
    });

    Route::get('/roles', [RoleController::class, 'index'])->middleware('permission:roles.view')->name('roles.index');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->middleware('permission:roles.update')->name('roles.update');

    Route::resource('users', UserController::class)->except([]);
});
