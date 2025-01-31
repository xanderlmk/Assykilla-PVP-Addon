function shootBuffedCrossbowBullet(targetLocation) {
    const velocity = { x: 0, y: 1, z: 5 }

    const arrow = targetLocation.dimension.spawnEntity("assy:buffed_crossbow_bullet", {
        x: targetLocation.x,
        y: targetLocation.y + 2,
        z: targetLocation.z
    })

    const projectileComp = arrow.getComponent("minecraft:projectile")

    projectileComp?.shoot(velocity)
}

function shootBuffedIceBoulderBullet(targetLocation) {
    const velocity = { x: 0, y: 1, z: 5 }

    const arrow = targetLocation.dimension.spawnEntity("assy:buffed_ice_boulder_bullet", {
        x: targetLocation.x,
        y: targetLocation.y + 2,
        z: targetLocation.z
    })

    const projectileComp = arrow.getComponent("minecraft:projectile")

    projectileComp?.shoot(velocity)
}



function onProjectileHit(event) {
    const hitEntity = event.getEntityHit(); 
    if (hitEntity) { 
        if (projectile.id === "assy:buffed_ice_boulder_bullet"){
            hitEntity.targetLocation.runCommand("function snowboulder");
            hitEntity.targetLocation.runCommand("function knockbackparticle");
        }
        if (projectile.id === "assy:buffed_crossbow_bullet"){
            hitEntity.targetLocation.runCommand("function slowpotion")
        }
    } else { 
        return
    }
}
world.events.projectileHitEntity.subscribe(onProjectileHit);


world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_buffed_crossbow:trigger", {
        onUse: e => {
            shootBuffedCrossbowBullet(e.targetLocation)
        },
    })
    initEvent.itemComponentRegistry.registerCustomComponent("assy_buffed_ice_boulder:trigger", {
        onUse: e => {
            shootBuffedIceBoulderBullet(e.targetLocation)
        },
    })
});