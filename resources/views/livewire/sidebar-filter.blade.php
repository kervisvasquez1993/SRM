<div class="col-lg-3 mb-4">
   
   <h3 class="mt-2">Categories</h3>
   @foreach($users as $index => $category)
       <div class="form-check">
           <input class="form-check-input" type="checkbox" id="category{{ $index }}" value="{{ $category->id }}" wire:model="selected.categories">
           <label class="form-check-label" for="category{{ $index }}">
               {{ $category }}
           </label>
       </div>
   @endforeach

   <h3 class="mt-2">Manufacturers</h3>
   @foreach($proveedores as $index => $manufacturer)
       <div class="form-check">
           <input class="form-check-input" type="checkbox" id="manufacturer{{ $index }}" value="{{ $manufacturer->id }}" wire:model="selected.manufacturers">
           <label class="form-check-label" for="manufacturer{{ $index }}">
               {{ $manufacturer}}
           </label>
       </div>
   @endforeach
</div> 