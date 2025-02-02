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

function shootBuffedDeathRevolverBullet(targetLocation){
    const velocity = { x: 0, y: 1, z: 5 }

    const arrow = targetLocation.dimension.spawnEntity("assy:buffed_revolver_bullet", {
        x: targetLocation.x,
        y: targetLocation.y + 2,
        z: targetLocation.z
    })

    const projectileComp = arrow.getComponent("minecraft:projectile")

    projectileComp?.shoot(velocity)
}

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
    initEvent.itemComponentRegistry.registerCustomComponent("assy_buffed_revolver:trigger", {
        onUse: e => {
            shootBuffedDeathRevolverBullet(e.targetLocation)
        }
    }
    )
});