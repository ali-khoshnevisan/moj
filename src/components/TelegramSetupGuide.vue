<script setup>
/**
 * TelegramSetupGuide.vue
 * Vue 3 (script setup) + Element Plus
 *
 * Usage:
 *   <TelegramSetupGuide />
 *   <TelegramSetupGuide :steps="mySteps" />
 *
 * Every icon is an inline SVG so it scales and follows the accent color.
 * If you'd rather use your PNGs, pass them through the per-card slot:
 *   <TelegramSetupGuide>
 *     <template #icon-0><img src="/img/1.png" alt=""></template>
 *   </TelegramSetupGuide>
 */
import { ElRow, ElCol } from "element-plus";

defineProps({
  steps: {
    type: Array,
    default: () => [
      {
        title: "Create Channel",
        text: "Set up a Telegram channel for your content.",
        icon: "plane",
        badge: "plus",
      },
      {
        title: "Generate Bot Token",
        text: "Create a bot using BotFather and copy the generated token.",
        icon: "bot",
        badge: "key",
      },
      {
        title: "Grant Admin Access",
        text: "Invite the bot to your channel and grant full admin permissions.",
        icon: "shield",
        badge: "check",
      },
      {
        title: "Connect Channel",
        text: "Enter your bot token and channel address to complete the setup.",
        icon: "link",
        badge: "check",
      },
    ],
  },
});

const pad = (n) => String(n + 1).padStart(2, "0");
</script>

<template>
  <section class="tg-guide">
    <el-row :gutter="24" class="tg-guide__row">
      <el-col
        v-for="(step, i) in steps"
        :key="step.title"
        :xs="24"
        :sm="12"
        :lg="24 / Math.min(steps.length, 4)"
        class="tg-guide__col"
      >
        <article class="tg-card" :class="{ 'is-last': i === steps.length - 1 }">
          <span class="tg-card__number">{{ pad(i) }}</span>

          <div class="tg-card__art">
            <span class="tg-card__halo" aria-hidden="true"></span>

            <slot :name="`icon-${i}`" :step="step">
              <svg
                class="tg-card__icon"
                viewBox="0 0 96 96"
                fill="none"
                stroke="currentColor"
                stroke-width="3.4"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <!-- 01 · paper plane -->
                <g v-if="step.icon === 'plane'">
                  <path d="M76 20 18 44l17 7 6 19 10-15" />
                  <path d="M76 20 41 55l10 15 25-50Z" />
                  <path d="M35 51 76 20" />
                </g>

                <!-- 02 · bot -->
                <g v-else-if="step.icon === 'bot'">
                  <rect x="24" y="32" width="48" height="38" rx="13" />
                  <path d="M48 32v-8" />
                  <circle cx="48" cy="20" r="4.4" />
                  <path d="M24 44h-4a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h4" />
                  <path d="M72 44h4a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-4" />
                  <circle cx="39" cy="49" r="4.2" />
                  <circle cx="57" cy="49" r="4.2" />
                </g>

                <!-- 03 · shield + person -->
                <g v-else-if="step.icon === 'shield'">
                  <path
                    d="M48 16 76 26v20c0 16-12 27-28 32-16-5-28-16-28-32V26l28-10Z"
                  />
                  <circle cx="48" cy="43" r="7.5" />
                  <path d="M35 63a13.5 13.5 0 0 1 26 0" />
                </g>

                <!-- 04 · chain link -->
                <g v-else-if="step.icon === 'link'">
                  <path
                    d="M55 27 66 16a13.5 13.5 0 0 1 19 19L74 46a13.5 13.5 0 0 1-19 0"
                  />
                  <path
                    class="tg-card__icon-cut"
                    d="M41 50 30 61a13.5 13.5 0 0 0 19 19l11-11"
                  />
                  <path
                    d="M41 69 30 80a13.5 13.5 0 0 1-19-19l11-11a13.5 13.5 0 0 1 19 0"
                  />
                  <path d="M38 58 58 38" />
                </g>
              </svg>
            </slot>

            <!-- corner badge -->
            <span class="tg-card__badge">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  v-if="step.badge === 'plus'"
                  d="M12 6.5v11M6.5 12h11"
                  stroke="currentColor"
                  stroke-width="2.4"
                  stroke-linecap="round"
                />
                <g
                  v-else-if="step.badge === 'key'"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="9.2" cy="9.2" r="3.4" />
                  <path
                    d="m11.7 11.7 5.4 5.4M14.3 14.3l-1.6 1.6M16.4 16.4l-1.6 1.6"
                  />
                </g>
                <path
                  v-else
                  d="m7 12.4 3.4 3.4L17 9"
                  stroke="currentColor"
                  stroke-width="2.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>

          <h3 class="tg-card__title">{{ step.title }}</h3>
          <span class="tg-card__rule" aria-hidden="true"></span>
          <p class="tg-card__text">{{ step.text }}</p>
        </article>
      </el-col>
    </el-row>
  </section>
</template>

<style scoped>
.tg-guide {
  --tg-accent: #1677ff;
  --tg-accent-soft: #eef4ff;
  --tg-ink: #101828;
  --tg-muted: #667085;
  --tg-surface: #ffffff;
  justify-items: center;

  padding: 48px 24px;
  //background: linear-gradient(180deg, #f7f9fc 0%, #f2f5fa 100%);
}

.tg-guide__row {
  max-width: 1240px;
  margin: 0 auto;
}

.tg-guide__col {
  margin-bottom: 24px;
}

/* ---------- card ---------- */
.tg-card {
  position: relative;
  height: 100%;
  padding: 56px 28px 40px;
  text-align: center;
  background: var(--tg-surface);
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04),
    0 12px 32px rgba(16, 24, 40, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.tg-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 2px 4px rgba(16, 24, 40, 0.05),
    0 20px 44px rgba(22, 119, 255, 0.14);
}

/* dotted connector between cards */
.tg-card::after {
  content: "";
  position: absolute;
  top: 8px;
  left: calc(100% + 4px);
  width: 40px;
  border-top: 2px dashed rgba(22, 119, 255, 0.45);
}

.tg-card.is-last::after {
  display: none;
}

/* ---------- number chip ---------- */
.tg-card__number {
  position: absolute;
  top: -20px;
  left: 28px;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--tg-accent);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  font-variant-numeric: tabular-nums;
  box-shadow: 0 6px 16px rgba(22, 119, 255, 0.35);
}

/* ---------- artwork ---------- */
.tg-card__art {
  position: relative;
  width: 148px;
  height: 148px;
  margin: 8px auto 28px;
  display: grid;
  place-items: center;
}

.tg-card__halo {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 45%,
    #eef3fb 0%,
    #f4f7fc 60%,
    rgba(244, 247, 252, 0) 100%
  );
}

.tg-card__icon {
  position: relative;
  width: 84px;
  height: 84px;
  color: var(--tg-accent);
  transition: transform 0.25s ease;
}

/* creates the "pass through" gap on the chain link */
.tg-card__icon-cut {
  stroke: #f1f5fb;
  stroke-width: 9;
}

.tg-card:hover .tg-card__icon {
  transform: scale(1.05);
}

.tg-card__badge {
  position: absolute;
  right: 20px;
  bottom: 26px;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--tg-accent);
  color: #fff;
  box-shadow: 0 4px 12px rgba(22, 119, 255, 0.35);
}

.tg-card__badge svg {
  width: 20px;
  height: 20px;
}

/* ---------- copy ---------- */
.tg-card__title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--tg-ink);
}

.tg-card__rule {
  display: block;
  width: 40px;
  height: 3px;
  margin: 16px auto 20px;
  border-radius: 2px;
  background: var(--tg-accent);
}

.tg-card__text {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--tg-muted);
}

/* ---------- responsive ---------- */
@media (max-width: 1199px) {
  .tg-card::after {
    display: none;
  }
}

@media (max-width: 575px) {
  .tg-guide {
    padding: 40px 16px;
  }
  .tg-card {
    padding: 52px 20px 32px;
  }
  .tg-card__art {
    width: 128px;
    height: 128px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tg-card,
  .tg-card__icon {
    transition: none;
  }
  .tg-card:hover {
    transform: none;
  }
}
</style>
