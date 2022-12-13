glslangValidator -G -V --entry-point main0 --source-entrypoint main shaders/default.vert -o shaders/vert.spv
glslangValidator -G -V --entry-point main0 --source-entrypoint main shaders/default.frag -o shaders/frag.spv
glslangValidator -G -V --entry-point blurMain --source-entrypoint main shaders/blur.vert -o shaders/blurvert.spv
glslangValidator -G -V --entry-point blurMain --source-entrypoint main shaders/blur.frag -o shaders/blurfrag.spv
