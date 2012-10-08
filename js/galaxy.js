
function leapfrog_update(galaxy, positions, velocities, dt) {
    if (dt == undefined) {
        dt = 0.1;
    }
    
    var new_positions = new Array(),
        new_velocities = new Array();

    for (var kk=0; kk < positions.length; kk++) {
        position = positions[kk];
        velocity = velocities[kk];
        
        var ai = galaxy.acceleration(position);
        var new_position = new Array();
        for (var ii=0; ii < position.length; ii++) {
            //console.log("pos: ii" + ii + "  " + position[ii] + velocity[ii]*dt + 0.5*ai[ii]*dt*dt);
            new_position.push(position[ii] + velocity[ii]*dt + 0.5*ai[ii]*dt*dt);
        }
        
        var new_ai = galaxy.acceleration(new_position);
        var new_velocity = new Array();
        for (var ii=0; ii < velocity.length; ii++) {
            //console.log("vel: ii" + ii + "  " + velocity[ii] + 0.5*(ai[ii] + new_ai[ii])*dt);
            new_velocity.push(velocity[ii] + 0.5*(ai[ii] + new_ai[ii])*dt);
        }
        
        new_positions.push(new_position);
        new_velocities.push(new_velocity);
    }
    
    return [new_positions, new_velocities];
}

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
}

function Galaxy(x0, y0, size) {
	this.x0 = x0;
	this.y0 = y0;
	this.populations = {};
	
	if (size == undefined) {
	    size = 100;
	}
	this.size = size
	
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
	
	this.acceleration = function(xy, U, C) {
        if (U == undefined) {
            U = 1.;
        }
        
        if (C == undefined) {
            C = 1.;
        }
        
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
    
    this.update = function() {
        /* Update each stellar population's positions and velocities */
        
        dt = 0.1;
        for (var key in this.populations) {
            if (this.populations.hasOwnProperty(key)) {
                this.populations.update(this, dt);
            }
        }
    }
} 

function test() {
    var init_pos = [4., 0.],
        init_vel = [0., 1.];
    
    var pos = init_pos,
        vel = init_vel;
    for (var jj=0; jj<10; jj++) {
        console.log("" + pos + "    " + vel);
        pos_vel = leapfrog_update(pos, vel);
        pos = pos_vel[0];
        vel = pos_vel[1];
    }
}