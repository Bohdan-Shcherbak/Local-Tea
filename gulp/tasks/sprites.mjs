// gulpfile.js (ESM)
import svgSprite from "gulp-svg-sprite";
import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
const icons = () => {
  return app.gulp.src(app.path.src.svg)
    // 1) Оптимізація SVG (сучасна, без помилок)
    .pipe(svgmin({
      full: true,
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              removeViewBox: false, // ЧОМУ: щоб SVG масштабувались
            }
          }
        }
      ]
    }))

      // 2) Примусово ставимо currentColor
      .pipe(cheerio({
        run: ($) => {
  
          // Додаємо дефолтний fill на сам svg
          $('svg').attr('fill', 'currentColor');
  
          // Працюємо тільки з графічними елементами
          $('path, circle, rect, ellipse, polygon, polyline').each(function () {
  
            const fill = $(this).attr('fill');
            const stroke = $(this).attr('stroke');
  
            // ===== FILL =====
            if (!fill) {
              // якщо немає — додаємо
              $(this).attr('fill', 'currentColor');
            } else if (fill !== 'none') {
              // якщо є і це не none — замінюємо
              $(this).attr('fill', 'currentColor');
            }
  
            // ===== STROKE =====
            if (stroke && stroke !== 'none') {
              $(this).attr('stroke', 'currentColor');
            }
  
          });
  
          // Видаляємо inline-стилі
          $('[style]').removeAttr('style');
  
        },
        parserOptions: { xmlMode: true }
      }))
      // .pipe(cheerio({
      //   run: ($) => {
  
      //     // Замінюємо fill на currentColor
      //     $('[fill]').each(function () {
      //       const val = $(this).attr('fill');
  
      //       // Не чіпаємо none
      //       if (val !== 'none') {
      //         $(this).attr('fill', 'currentColor');
      //       }
      //     });
  
      //     // Замінюємо stroke на currentColor
      //     $('[stroke]').each(function () {
      //       const val = $(this).attr('stroke');
  
      //       if (val !== 'none') {
      //         $(this).attr('stroke', 'currentColor');
      //       }
      //     });
  
      //     // Видаляємо inline-стилі
      //     $('[style]').removeAttr('style');
      //   },
      //   parserOptions: { xmlMode: true }
      // }))

    // 3) Виправляємо символи >, які cheerio ламає
    .pipe(app.plugins.replace('&gt;', '>'))

    // 4) Формуємо symbol-спрайт
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../icons/sprite.svg",    // ЧОМУ: правильний шлях у dist/img
          example: true            //  demo html
        }
      },
      shape: {
        id: {
          generator: function (name) {
            return name.split('\\').pop().replace('.svg','')
          }
        }}
    }))

    .pipe(app.gulp.dest(app.path.build.img));
};

const iconsCss = () => {
  return app.gulp.src(app.path.src.svgIgnore)
    .pipe(svgmin({
      full: true,
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              removeViewBox: false, // ЧОМУ: щоб SVG масштабувались
            }
          }
        }
      ]
    }))
      .pipe(app.gulp.dest(app.path.build.img));
}
export const sprites = app.gulp.series(icons,iconsCss)