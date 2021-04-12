@extends('admin.dashboar')

<div class="d-flex justify-content-end">
    <a
        class="btn btn-outline-primary btn-round" 
        href="{{ url('/produccion-transito') }}"
        data-toggle="tooltip" 
        data-placement="left" 
        title="Regresar"
    >
    <span class="material-icons mr-2">
        keyboard_backspace
    </span>
        Regresar
    </a>
</div>

<h4>Crear Pago de Balance</h4>