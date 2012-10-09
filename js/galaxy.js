var pi = 3.1415926;

function StellarPopulation(positions, velocities) {
    this.positions = positions;
    this.velocities = velocities;
    
    this.update = function(galaxy, dt) {
        /*  Uses the leapfrog method to integrate the positions of this stellar 
            population forward by one timestep. Note that Leapfrog is only 
            symplectic if the timestep remains constant.
        */
        
        if (dt == undefined) {
            dt = 0.1;
        }
        
        var new_positions = new Array(),
            new_velocities = new Array();
    
        for (var kk=0; kk < this.positions.length; kk++) {
            // Get the old positions and velocities
            position = this.positions[kk];
            velocity = this.velocities[kk];
            
            // Compute the new positions
            var ai = galaxy.acceleration(position);
            var new_position = new Array();
            for (var ii=0; ii < position.length; ii++) {
                //console.log("pos: ii" + ii + "  " + position[ii] + velocity[ii]*dt + 0.5*ai[ii]*dt*dt);
                new_position.push(position[ii] + velocity[ii]*dt + 0.5*ai[ii]*dt*dt);
            }
            
            // Compute the new velocities
            var new_ai = galaxy.acceleration(new_position);
            var new_velocity = new Array();
            for (var ii=0; ii < velocity.length; ii++) {
                //console.log("vel: ii" + ii + "  " + velocity[ii] + 0.5*(ai[ii] + new_ai[ii])*dt);
                new_velocity.push(velocity[ii] + 0.5*(ai[ii] + new_ai[ii])*dt);
            }
            
            new_positions.push(new_position);
            new_velocities.push(new_velocity);
        }
        
        this.positions = new_positions;
        this.velocities = new_velocities;
    }
    
    this.draw = function(context, color) {
        if (color == undefined) {
            color = "rgba(175,175,175,0.8)";
        }
        
        var vel = this.velocities,
            pos = this.positions;
            
        for (var ii=0; ii < pos.length; ii++) {
            total_vel = vel[ii][0]*vel[ii][0] + vel[ii][1]*vel[ii][1];
            context.beginPath();
            context.fillStyle = color;
            context.arc(pos[ii][0],pos[ii][1], 1, 0, Math.PI*2,true);
            context.closePath();
            context.fill();
        }
    
    }
}

function Galaxy(x0, y0, U) {
	this.x0 = x0;
	this.y0 = y0;
	this.populations = {};
	
	if (U == undefined) {
	    U = 0.8;
	}
	this.U = U;
	
	this.xy_to_rphi = function(x, y) {
		// convert 2D cartesian to cylindrical coordinates around the point (x0,y0)
		var r = Math.sqrt((x-this.x0)*(x-this.x0) + (y-this.y0)*(y-this.y0));
		var phi = Math.atan2((y-this.y0), (x-this.x0));
		return [r, phi];
	}
	
	this.rphi_to_xy = function(r, phi) {
		// convert 2D cylindrical coordinates around the point (x0,y0) to Cartesian
		var x = r*Math.cos(phi) + this.x0,
		    y = r*Math.sin(phi) + this.y0;
		return [x,y];
	}
	
	this.acceleration = function(xy) {
        C = 1.;
        
        // Set the galaxy position
        var xdotdot = - (2 * U*U * (xy[0]-this.x0)) / (U*U*(xy[0]-this.x0)*(xy[0]-this.x0) + (xy[1]-this.y0)*(xy[1]-this.y0) + C*C*U*U),
            ydotdot = - (2 * (xy[1]-this.y0)) / (U*U*(xy[0]-this.x0)*(xy[0]-this.x0) + (xy[1]-this.y0)*(xy[1]-this.y0) + C*C*U*U);
        
        return [xdotdot, ydotdot];
    }
    
    this.add_population = function(initial_position, initial_velocity, name) {
        if (name == undefined) {
            throw new Error("You must name this population of stars.");
        }
        
        this.populations[name] = new StellarPopulation(initial_position, initial_velocity);
    }
    
    this.update = function(dt) {
        /* Update each stellar population's positions and velocities */
        
        if (dt == undefined) {
            dt = 0.1;
        }
        
        for (var key in this.populations) {
            if (this.populations.hasOwnProperty(key)) {
                this.populations[key].update(this, dt);
            }
        }
    }
    
    this.add_disk = function(number, radius, dispersion) {
        // Create an array of random initial positions and velocities for N particles (stars)
        var init_pos = new Array(),
            init_vel = new Array();
        
        var gg = 0;
        while (gg < number) {
            // choose stars to start with random radii around the center out to a radius
            //  supplied by the user
            init_r = Math.sqrt(Math.random()*radius*radius);
            init_phi = Math.random()*2.*pi;
            init_pos.push(this.rphi_to_xy(init_r, init_phi));
            
            var mag_v = 1.4,
                vx = -mag_v * Math.sin(init_phi) + (Math.random()-0.5)*(dispersion/100.0/1.41),
                vy = mag_v * Math.cos(init_phi) + (Math.random()-0.5)*(dispersion/100.0/1.41);
                
            init_vel.push([vx, vy]);
            gg++;
        }
        
        this.add_population(init_pos, init_vel, "disk");
        
    }
    
    this.add_bulge = function(number, radius, dispersion) {
        // Create an array of random initial positions and velocities for N particles (stars)
        var init_pos = new Array(),
            init_vel = new Array();
        
        var gg = 0;
        while (gg < number) {
            // choose stars to start with random radii around the center out to a radius
            //  supplied by the user
            init_r = Math.sqrt(Math.random()*radius*radius);
            init_phi = Math.random()*2.*pi;
            init_pos.push(this.rphi_to_xy(init_r, init_phi));
            
            var mag_v = 0.6,
                vx = -mag_v * Math.sin(init_phi) + (Math.random()-0.5)*(dispersion/100.0/1.41),
                vy = mag_v * Math.cos(init_phi) + (Math.random()-0.5)*(dispersion/100.0/1.41);
            init_vel.push([vx, vy]);
            gg++;
        }
        
        this.add_population(init_pos, init_vel, "bulge");
        
    }
    
    this.draw = function(context, colors) {
        /* Draw all stellar populations to the given context */
        context.clearRect(0,0, context.canvas.width, context.canvas.height);
        for (var key in this.populations) {
            if (this.populations.hasOwnProperty(key)) {
                if ((colors != undefined) && (colors.hasOwnProperty(key)) ) {
                    this.populations[key].draw(context, colors[key]);
                } else {
                    this.populations[key].draw(context);
                }
            }
        }
    }
    
} 