import { system, world } from '@minecraft/server';

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.blockComponentRegistry.registerCustomComponent('assy_dying_block:trigger', {
  onStepOn: e => { e.entity.addEffect("minecraft:poison", 20000.0, { amplifier: 10 }); },
});

});
