# 2020 CG HW2 Spec
###### tags: `NCTU Computer Graphics`

* [Shader API](https://docs.google.com/presentation/d/1lqe95SfCTEm5aRumcalcVQyWnWYjY3M4yv__H4Ng1vM/edit?usp=sharing)
* [HW2 Hint](https://docs.google.com/presentation/d/1xfI6hd3VGlGjwhTmH0Z7q6Bhk0oY4mWNrMedZilwSOo/edit?usp=sharing)
* [Demo Schedule](https://docs.google.com/spreadsheets/d/1hGpzHCZ5K32S7UMiG7np0XQM6EDUolhW9JWPduDIQok/edit?usp=sharing) (11/10-11/12): Register from 11/08 00:00
* HW2 Due Date: 11/09 23:59:59
---
:::info

***Computer Graphics 2020 - Homework 2***

In this homework, you’re required to write a program that implements several visual effects using GLSL, OpenGL Shading Language

:::
* In CG_HW2_EXAMPLE, you can execute and show a triangle with a color.

    * Example shader files are in the path "dll/Resources/shaders".

* Follow the TODO instructions and write your code in project CG_HW2.

* You can find details of Model.hpp, Input.hpp, and Shader.hpp in "Header files" directory in CG_HW2.
## Object Overview

* Overview:

    1. Render the model with texture using VBO and/or VAO (25%)

    2. Implement **Phong shading** via shader(30%)

    3. Implement **Dissolving effects** via shader (20%)
    
    4. Implement **Ramp effects** via shader (15%)
    
    5. Report (10%)

    6. Bonus (10%)

    7. Some keyboard callback functions for switching modes.
       :::info
       When press 'b', the program should switch between 3 modes : Phong Shading, Dissolving, and Ramp Shading.
       If you need other callback functions, feel free to add it.
       :::

* Preview (Click the Picture for full resolution pictures)
    * [Demo Video](https://rb.gy/drvitd)

| Phong Shading | Dissolving | Ramp |
| -------- | -------- | -------- |
|[![](https://i.imgur.com/vxndahE.png =400x)](https://i.imgur.com/vxndahE.png) | [![](https://i.imgur.com/Urgtz62.png =400x)](https://i.imgur.com/Urgtz62.png) |[![](https://i.imgur.com/a2X00iV.png =400x)](https://i.imgur.com/a2X00iV.png) |

## Details in each part

1. Render the model with texture (using VBO and/or VAO) (25%)

    :::danger
    Using built-in uniform variables in shader is forbidden!
    ( That is, you cannot use **gl_ModelViewMatrix** or **gl_NormalMatrix** ...etc )
    The only gl_XXX term should be in your shader code is gl_Position.
    :::
    :::info
    All matrices should be passed in as uniform variables.
    Besides **ModelMatrix** we gave in the release file, you also need to pass **ProjectionMatrix** and **ViewMatrix** to the shader.

    
    Also, the light position in the Phong Shading is meant to be in local space, while the light position is recorded in world space. You might need to do some space conversion, and you might need some inverse matrices to do that.
    For example, to retrieve inverse model matrix, you can do inverse transformation and get current matrix.
    :::
    
    * Render the model "bunny.obj" using VBO or VAO

        * Below messages can be ignored:
            
            ```
            GLM: Warning: glmReadMTL: Command "Ke" ignored            
            GLM: Warning: refraction index ignored
            ```
        * Also, you can use another model : "Ball.obj" for debugging.
            ```
            // this will load the bunny model
            char *obj_file_dir = "Resources/bunny.obj";
            
            // this will load the ball model, which can come in handy
            // when debugging lighting/shading
            char *obj_file_dir = "Resources/Ball.obj";
            ```
    :::info
    Values mentioned below can be tuned when you're debugging or experimenting, but in your final presenting project, please tune the parameters to the listed values.
    :::

    * Parameters of ball/bunny material:
        * Ambient reflectivity (Ka) : 1 1 1
        
        * Diffuse reflectivity (Kd) : 1 1 1
        
        * Specular reflectivity (Ks) : 1 1 1
        
        

2. Phong shading (30%)

    :::info
    Look for implementation details in the reference section.
    
    The parameters value of light, likewise, can be tuned when debugging. But please tune it to the below values when uploading.
    
    Please follow this equation.
    ![](https://i.imgur.com/Gp12MLj.png)
    Where...
    **K** is the reflectivity of each component of the material.
    (Ka is the ambient reflectivity)
    **L** is the intensity of each component of the light.
    (La is the ambient intensity)
    **α** is the glossiness of the material.
    
    • Object color affects Ka and Kd, and light color affects Ks
    • Multiply the ambient and diffuse component with texture rgb
    • Specular component should be independent from texture rgb
    :::

    * Parameters of light:
        
        * Ambient intensity (La) : 0.2 0.2 0.2

        * Diffuse intensity (Ld) : 0.8 0.8 0.8

        * Specular intensity (Ls) : 0.5 0.5 0.5

        * gloss (Specular shininess factor) : 100

       
3. Dissolving effect (20%)
    :::info
    An animation of the model dissolving is required, but it doesn't have to be automated. You can use keyboard callback functions if you want to, but if you do, please specify your key bindings in the report.
    You might want to start by reading related articles in the reference section.
    :::
    
    * You don't need to combine phong shading with Dissolving effects
    
    * You should have a color for dissolved edges
  
    * The color doesn't need to be adjustable in runtime

    * The progress of dissolving should be adjusted at runtime (Your program need to demonstrate a full object dissolving to nothing. If the dissolving looks discontinuous, it's ok as long as the effect is correct.)
  
4. Ramp effect (15%)
    :::info
    Ramp effect or Ramp shading is basically a discrete shading using a customized texture to adjust light falloff. Ramp effects often appears when trying to create toon or other non-photoreleastic effects in game industry.
    :::
    * Implement only diffuse color with ramp effect enabled

    * You can do this without ramp texture, just implement your own normalize function.

    * Hint: you might want to clamp the uv of ramp texture to (0, 1) instead of [0, 1].

5. Report (10%)
    * Please specify your name and student ID in the report.

    * Explain how you implement the above reqirements. 
    
    * Describe the problems you met and how you solved them.

    * Illustrate extra features of your design. (optional)

6. Bonus (10%)
    
    * Be creative! All extra features are welcomed! :+1: 
    
    * Some Recommendations:
          
        * Other light model (implemented in Shader!)
          
        * Other effects (implemented in Shader!)
          
        * Shader Optimization (specify it in your report!)

## Restrictions

:::danger
Your final code should not contain glmDraw! It's meant for a quick preview of the model and shouldn't exist in your final code.
:::

* Your GLSL version should >= ``` #version 330```

* Deprecated shader syntaxes are ***not allowed***, e.g. ```attribute```, ```varying```

* You are only allowed to use VBO and/or VAO when rendering model 

* You are only allowed to pass uniform data to shader using ```glUniform*``` series function

* Using built-in uniform variables in shader is ***forbidden!***
    * (That is, you ***cannot*** use **gl_ModelViewMatrix** or **gl_NormalMatrix** ...etc)
    * The only gl_XXX term should be in your shader code is **gl_Position**.

## Deadline

Please hand in your code and report (in a .zip file) using E3, deadline will be at 2020/11/09 23:59:59.

Penalty of 10 points of the value of the assignment per late day.

## Running Enviornment

Visual Studio 2019 is recommended.

You may specify your target environment by providing a ```README``` or ```MAKEFILE```, but it’s better to inform the TAs beforehand, just in case we cannot execute your program.

## Upload Format

:::danger
If your uploading format doesn't match our requirement, there will be penalty to your score.
:::

Please hand in the whole project file and report (.pdf) as ```STUDENTID_hw2.zip``` ​ to e3 platform.
You can delete the example we provided.

e.g. ```309123456_hw2.zip```

## References
* [LearnOpenGL](https://learnopengl.com/Lighting/Basic-Lighting)
* [Help with Gouraud/Phong Shading in Shaders](https://www.opengl.org/discussion_boards/showthread.php/185829-Help-with-Gouraud-Phong-Shading-in-Shaders)
* [Trouble with Phong Shading](https://stackoverflow.com/questions/24132774/trouble-with-phong-shading)
(this article merges Ls with Ld and use Li to represent them, but the basic idea is the same)
* [What is Ramp Shading or Lighting?](https://gamedev.stackexchange.com/questions/51063/what-is-ramp-shading-or-lighting)
* [溶解(Dissolve)效果](https://blog.csdn.net/huangzhipeng/article/details/7956656)
