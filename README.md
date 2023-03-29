# Slider

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Notes

This slider can be interacted with in three ways:

- Click on the desired tick or number.
- Tab to or click on the slider, then use right/left arrow keys (for accessibility)
- Click on the knob and drag it to the desired location

## Known issues

Animation state breaks when setting the slider and then using using click or keyboard.

When using arrows the selected number can break the range.

When using drag the knob can be dragged entirely out of the range.

When dragging it's pretty earsy to lose the knob when moving the mouse too quickly.

CSS isn't perfect! I left twiddling that to last and ran out of time.
