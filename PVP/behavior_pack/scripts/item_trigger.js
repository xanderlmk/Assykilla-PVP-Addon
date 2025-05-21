import { world } from "@minecraft/server";


function durabilityOnChanged(item, player, isHitEntity = false) {
  let level = item.getComponent("minecraft:enchantable")?.getEnchantment("unbreaking")?.level;

  function durability() {
    let durability = item.getComponent("minecraft:durability");

    const t = Math.floor(Math.random() * 100);

    if (t < durability.getDamageChance()) {
      if (!isHitEntity) { durability.damage += 1; }
      if (durability.damage >= durability.maxDurability) {
        player.playSound("random.break");
        if (!isHitEntity) {
          player.getComponent('equippable').setEquipment('Mainhand', undefined)
        }
      }
      else if (!isHitEntity) {
        player.getComponent('equippable').setEquipment('Mainhand', item)
      }
    } else {
      if (!isHitEntity) { return; }
      durability.damage -= 1;
      if (!isHitEntity) {
        player.getComponent('equippable').setEquipment('Mainhand', item);
      }
    }
  }

  const t = Math.floor(Math.random() * 10)
  if (level === 1 && t > 8) return;
  else if (level === 2 && t > 6) return;
  else if (level === 3 && t > 4) return;
  else durability();
}

world.beforeEvents.worldInitialize.subscribe(initEvent => {
  initEvent.itemComponentRegistry.registerCustomComponent('assy_catapult_sword:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function resistance1");
    },

    onHitEntity: e => {
      durabilityOnChanged(e.itemStack, e.source, true); e.attackingEntity.runCommand("function slowness");
      e.attackingEntity.runCommand("function nullx");
      e.attackingEntity.runCommand("function nullxx");
      e.attackingEntity.runCommand("function nullxxx");
      e.attackingEntity.runCommand("function nullxxxxx");
      e.attackingEntity.runCommand("function nullxxxxxx");
      e.attackingEntity.runCommand("function nullxxxxxxx");
      e.attackingEntity.runCommand("function nullxxxxxxxx");
    },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_wooden_katana:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function resistance2");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_stone_katana:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function resistance2");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_cavemen_bat:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function cavemanresistance");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_magic_wand:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function summon8fangs");
      e.source.runCommand("function magicfangs");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_iron_man_landers:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function levitation");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_destroyer:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function replacedirt");
      e.source.runCommand("function replacebedrock");
      e.source.runCommand("function replacegrass");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_horse_teleport:trigger', {
    onUse: e => { e.source.runCommand("function skeletonhorse"); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_iron_hammer:trigger', {


    onHitEntity: e => {
      durabilityOnChanged(e.itemStack, e.source, true); e.attackingEntity.runCommand("function nullx");
      e.attackingEntity.runCommand("function nullxx");
      e.attackingEntity.runCommand("function nullxxx");
      e.attackingEntity.runCommand("function slownesshit");
    },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_katana:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function resistance2");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_ice_blade:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function snowstorm");
      e.source.runCommand("function storm");
      e.source.runCommand("function explosionparticle");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_falcon_bomb:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
  initEvent.itemComponentRegistry.registerCustomComponent('assy_disk_generator:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function givedisk");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_ice_boulder:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
  initEvent.itemComponentRegistry.registerCustomComponent('assy_dagger:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function vampiredash");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_infinity_gauntlet:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function givedisk_gauntlet");
      e.source.runCommand("function timestone");
      e.source.runCommand("function powerstone2");
      e.source.runCommand("function spacestone");
      e.source.runCommand("function mindandspace");
      e.source.runCommand("function realitystone");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_power_rifle:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }

  {
    initEvent.itemComponentRegistry.registerCustomComponent('assy_give _slowness:trigger', {
      onHitEntity: e => { e.source.runCommand("function slowpotion") }
    })
  }
  initEvent.itemComponentRegistry.registerCustomComponent('assy_baton:trigger', {

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); e.attackingEntity.runCommand("function slowness"); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_hulk_hand:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function knockbackparticle");
      e.source.runCommand("function hulksmash");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_speed_one:trigger', {
    onUse: e => { e.source.runCommand("function speed1"); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_speed_two:trigger', {
    onUse: e => { e.source.runCommand("function speed2"); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_speed_three:trigger', {
    onUse: e => { e.source.runCommand("function speed3"); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_soul_stone:trigger', {
    onUse: e => { e.source.runCommand("function soul_stone_effects"); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_speed_five:trigger', {
    onUse: e => { e.source.runCommand("function speed5"); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_speed_sixteen:trigger', {
    onUse: e => { e.source.runCommand("function speed16"); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_spiderman_webfiller:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function webfiller");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); e.attackingEntity.runCommand("function webfiller"); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_upgraded_trident:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        mainhand.amount++;
      },
    })
  }
  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_ultimate_trident:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_spiderman_web_trapper:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) {return;}
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) {return;}
        mainhand.amount++;
      },
    })
  }
  initEvent.itemComponentRegistry.registerCustomComponent('assy_buffed_disk_generator:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function powerstone2");
      e.source.runCommand("function givebuffed_disk");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_buffed_ice_boulder:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
  initEvent.itemComponentRegistry.registerCustomComponent('assy_buffed_catapult:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function resistance1");
      e.source.runCommand("function catapult_spikes");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_zom_disk_generator:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function givedisk");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_hell_katana:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function resistance2");
      e.source.runCommand("function fire_enchant");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_packed_ice_blade:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function explosionparticle");
      e.source.runCommand("function blizzardstorm");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_poison_katana:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function resistance2");
      e.source.runCommand("function katana_poison");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); e.attackingEntity.runCommand("function katana_poison"); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_master_katana:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function resistance2");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_cavemen_fury:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function cavemanresistance");
      e.source.runCommand("function cavemenfury");
      e.source.runCommand("function cavemanfury");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_mystery_box:trigger', {
    onUse: e => {
      e.source.runCommand("function giveiron_hammer");
      e.source.runCommand("function giverevolver");
      e.source.runCommand("function give16reality_disks");
      e.source.runCommand("function givedisk_generator");
      e.source.runCommand("function giveice_boulder");
      e.source.runCommand("function givebat_and_shield");
      e.source.runCommand("function giveoriginal_katana");
      e.source.runCommand("function giveshotgun");
      e.source.runCommand("function giveiron_sword");
      e.source.runCommand("function giveiron_swordx");
      e.source.runCommand("function giveiron_swordxx");
      e.source.runCommand("function giveiron_swordxxx");
      e.source.runCommand("function givediamond_sword");
      e.source.runCommand("function givediamond_swordx");
      e.source.runCommand("function givediamond_swordxx");
      e.source.runCommand("function givediamond_swordxxx");
      e.source.runCommand("function givenetherite_sword");
      e.source.runCommand("function givenetherite_swordx");
      e.source.runCommand("function givenetherite_swordxx");
      e.source.runCommand("function giveshuriken");
      e.source.runCommand("function giveshurikenx");
      e.source.runCommand("function giveshurikenxx");
      e.source.runCommand("function give8normaldisk");
      e.source.runCommand("function give8normaldiskx");
      e.source.runCommand("function giveiron_katana");
      e.source.runCommand("function giveiron_katanax");
      e.source.runCommand("function giveiron_katanaxx");
      e.source.runCommand("function givediamond_katana");
      e.source.runCommand("function givediamond_katanax");
      e.source.runCommand("function givediamond_katanaxx");
      e.source.runCommand("function givenetherite_katana");
      e.source.runCommand("function givenetherite_katanax");
      e.source.runCommand("function givestone_sword");
      e.source.runCommand("function givestone_swordx");
      e.source.runCommand("function giveoriginal_katanax");
      e.source.runCommand("function giveiron_hammerx");
      e.source.runCommand("function giveiron_katanaxxx");
      e.source.runCommand("function givediamond_katanaxxx");
      e.source.runCommand("function givedemonsword");
      e.source.runCommand("function givenetherite_ingot");
      e.source.runCommand("function givecatapult_sword");
      e.source.runCommand("function givecatapult_swordx");
      e.source.runCommand("function givedemonswordx");
      e.source.runCommand("function giveghosthand");
      e.source.runCommand("function givecrossbow");
      e.source.runCommand("function givecrossbowx");
      e.source.runCommand("function givetrident");
      e.source.runCommand("function giveice_blade");
      e.source.runCommand("function giverifle");
    },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_iron_katana:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function resistance2");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_golden_katana:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function resistance2");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_diamond_katana:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function resistance2");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_netherite_katana:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function resistance2");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_ghost_hand:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function speed1");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_reaper_hand:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function speed1");
      e.source.runCommand("function hammerslash");
      e.source.runCommand("function zombie_levitation");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_death_trident:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
  initEvent.itemComponentRegistry.registerCustomComponent('assy_pearl_generator:trigger', {
    onUse: e => { e.source.runCommand("function give_ender_pearls"); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_splashing_needles:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function hammerslash");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_zombie_slayer:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function fire_enchant");
      e.source.runCommand("function katana_poison");
      e.source.runCommand("function cavemanresistance");
      e.source.runCommand("function cavemanfury");
      e.source.runCommand("function perm_resistance2");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); e.attackingEntity.runCommand("function katana_poison"); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_normal_trident:trigger", {
      onUse: e => {
        e.amount = 1
      },
    })
  }
  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_packed_rifle:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
  initEvent.itemComponentRegistry.registerCustomComponent('assy_wind_charger:trigger', {
    onUse: e => { e.source.runCommand("function give_wind_charge"); },
  });

  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_lighting:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
  initEvent.itemComponentRegistry.registerCustomComponent('assy_vampirefeast:trigger', {
    onUse: e => {
      e.source.runCommand("function vampirebite");
      e.source.runCommand("function vampireteleport");
      e.source.runCommand("function vampireheal2");
    },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_ghostspeed:trigger', {
    onUse: e => { e.source.runCommand("function ghostspeed"); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_magic_sword:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function summon8fangs");
      e.source.runCommand("function summonx16fangs");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_buffed_hammer:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function hammerslash");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_demon_sword:trigger', {


    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_devil_sword:trigger', {
    onUse: e => {
      durabilityOnChanged(e.itemStack, e.source, false);
      e.source.runCommand("function zombie_levitation");
      e.source.runCommand("function demonslash");
    },

    onHitEntity: e => { durabilityOnChanged(e.itemStack, e.source, true); },
    onMineBlock: e => { durabilityOnChanged(e.itemStack, e.source, false); },
  });

  initEvent.itemComponentRegistry.registerCustomComponent('assy_potion_summoner:trigger', {
    onUse: e => {
      e.source.runCommand("function summon_damage");
      e.source.runCommand("function summon_enderpearl");
      e.source.runCommand("function summon_decay");
      e.source.runCommand("function weaknessspell");
    },
  });

  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_shotgun:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_ice_spell:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_revolver:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_nausea_spell:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_laser_rifle:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
  {
    initEvent.itemComponentRegistry.registerCustomComponent("assy_buffed_shotgun:trigger", {
      onUse: e => {
        const equippable = e.source.getComponent("minecraft:equippable");
        if (!equippable) return;
        const mainhand = equippable.getEquipmentSlot("Mainhand");
        if (!mainhand.hasItem()) return;
        mainhand.amount++;
      },
    })
  }
});
