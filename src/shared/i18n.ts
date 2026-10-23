import type { Language } from "./types";

export const LANGUAGE_OPTIONS: Array<{ value: Language; label: string }> = [
  { value: "zh-CN", label: "中文" },
  { value: "en", label: "English" }
];

export function resolveLanguage(value: unknown): Language {
  return value === "en" ? "en" : "zh-CN";
}

export function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export const I18N = {
  "zh-CN": {
    bubble: {
      woof: ["woof!", "汪！", "汪汪~"],
      breakReminder: [
        "坐太久啦，去走一分钟吧",
        "我想和你玩儿一会儿，去走一分钟吧",
        "坐了好久了……去走一分钟吧！",
        "我想玩儿了，去走一分钟吧"
      ],
      breakDone: [
        "好耶！摇尾巴~",
        "耶耶耶 好喜欢你",
        "开心！"
      ],
      breakRun: [
        (seconds: number) => `我还要玩 ${seconds} 秒！快离开屏幕~`,
        (seconds: number) => `倒计时 ${seconds} 秒，别偷偷回来哦`,
        (seconds: number) => `${seconds} 秒！`
      ],
      breakRunComplete: [
        "玩够啦，回来陪你坐会儿~",
        "回来啦！我在等你呢",
        "休息完毕，蹲好了~"
      ],
      breakIgnore: [
        "好吧……但我会担心你的",
        "呜……那你下次一定站起来",
        "好吧，我先趴着等你……"
      ],
      hydrationReminder: [
        "我有点渴了……你也喝口水吧？",
        "想喝水了！你也来一口嘛",
        "舔舔嘴……该喝水啦",
        "水碗空了！你的杯子呢？"
      ],
      hydrationDone: [
        "咕嘟咕嘟，舒服~",
        "喝饱啦！",
        "汪，水真好喝"
      ],
      focusStart: [
        (minutes: number) => `好，我帮你看着这 ${minutes} 分钟！`,
        (minutes: number) => `专心${minutes} 分钟，我盯着`
      ],
      focusWarning: [
        (rule: string) => `说好专注的，不许看 ${rule}`,
        (rule: string) => `走神啦！${rule} 不能玩`,
        (rule: string) => `你怎么在偷偷看 ${rule} 了`,
      ],
      focusComplete: [
        "专心时间到！",
        "专心结束！摇尾巴~",
      ],
      focusCancelled: [
        "好，我陪你歇会儿",
        "收工！我趴下啦"
      ],
      focusBack: [
        "好，我继续盯着~",
        "嗯！回去干活吧",
        "我也继续专心啦"
      ],
      updateAvailable: [
        (version: string) => `发现新版本 ${version}，去看看更新吧`,
        (version: string) => `PawPal 有新版本 ${version} 啦`
      ],
      tokenBalance: [
        (percent: string, remaining: string, reset: string) =>
          reset
            ? `Token 余量 ${percent}（剩 ${remaining}），${reset}重置`
            : `Token 余量 ${percent}（剩 ${remaining}）`,
        (percent: string, remaining: string, reset: string) =>
          reset
            ? `提醒一下：额度还剩 ${percent}，约 ${remaining}，${reset}刷新`
            : `提醒一下：额度还剩 ${percent}，约 ${remaining}`,
        (percent: string, remaining: string, reset: string) =>
          reset
            ? `Token 只剩 ${percent} 啦，${reset}恢复，省着点用~`
            : `Token 只剩 ${percent} 啦，省着点用~`
      ],
      tokenBalanceNoTotal: [
        (remaining: string) => `Token 余量：剩 ${remaining}`,
        (remaining: string) => `提醒一下：额度还剩 ${remaining}`
      ],
      tokenBalanceUnlimited: [
        "Token 额度无限，随便用~",
        "额度无限，不用担心啦"
      ],
      workStartReminder: [
        "到上班时间啦，一起开工吧！",
        "上班咯，我陪你一起~"
      ],
      workEndReminder: [
        "下班啦！今天辛苦了",
        "下班时间到，快收拾东西回家~"
      ],
      mealReminder: [
        (time: string) => `${time} 到啦，该吃饭了！`,
        (time: string) => `饭点到了（${time}），别饿着自己~`
      ]
    },
    actions: {
      breakDone: "我站起来了",
      breakRunDone: "我回来了",
      breakSnooze: "10 分钟后提醒",
      breakMute: "今天先别管我",
      hydrationDone: "我喝水了",
      hydrationSnooze: "稍后提醒",
      focusBack: "回去工作",
      focusEnd: "结束专注"
    },
    menu: {
      showDog: "显示宠物",
      hideDog: "隐藏宠物",
      startFocusMode: "开始专注模式",
      stopFocusMode: "停止专注模式",
      customActions: "自定义动作",
      unnamedAction: "未命名动作",
      demoBreakReminder: "演示：休息提醒",
      demoHydrationReminder: "演示：喝水提醒",
      demoFocusWarning: "演示：分心提醒",
      demoHappyReaction: "演示：开心反馈",
      settings: "设置",
      resetToday: "重置今日",
      quit: "退出"
    },
    settings: {
      title: "设置",
      welcomeTitle: "欢迎使用 PawPal",
      welcomeCopy:
        "PawPal 会住在菜单栏和屏幕底部，定时提醒你休息、喝水和保持专注。分心检测目前仅支持 macOS，需要在系统设置里允许辅助功能权限。",
      dismissWelcome: "知道了",
      appearance: "外观",
      system: "系统",
      launchAtLogin: "开机自启",
      launchAtLoginHelp: "正式打包版本会在 macOS 或 Windows 登录后启动；开发环境只保存偏好，不注册系统登录项。",
      about: "关于",
      version: "版本",
      releaseNotes: "更新说明",
      openReleaseNotes: "打开 Releases",
      updates: "更新",
      checkForUpdates: "检查更新",
      checkingUpdates: "检查中…",
      updateCheckOnLaunch: "启动时检查更新",
      updateCheckOnLaunchHelp: "开启后每次启动会检查 GitHub 最新 Release；关闭时只在你手动检查时联网。",
      updateIdle: "还没有检查更新。",
      updateAvailable: (version: string) => `发现新版本 ${version}`,
      updateCurrent: (version: string) => `已是最新版本 ${version}`,
      updateError: (message: string) => `检查失败：${message}`,
      updateChecking: "正在检查 GitHub Releases…",
      latestVersion: (version: string) => `最新版本：${version}`,
      quickActions: "快捷操作",
      testTools: "测试工具",
      language: "语言",
      petAppearance: "宠物形象",
      customPet: "自定义",
      customPetAssets: "自定义素材",
      customPetRequirements: "仅支持 GIF；默认状态素材必填，其它状态可选；建议使用透明背景并保持主体大小一致",
      customPetReady: "已可使用",
      customPetMissingRequired: "需要上传默认状态素材",
      customPetRequired: "必填",
      customPetOptional: "可选",
      uploadGif: "上传 GIF",
      replaceGif: "替换 GIF",
      removeGif: "移除",
      lineDogReference: "线条小狗参照",
      referenceAsset: "参考素材",
      petStates: {
        idle: "默认状态",
        sitting: "坐下",
        happy: "开心",
        breakPrompt: "休息提醒",
        breakRunning: "休息中",
        breakDone: "休息完成",
        hydrationPrompt: "喝水提醒",
        drinking: "喝水中",
        hydrationDone: "喝水完成",
        focusGuard: "专注守护",
        focusAlert: "分心提醒",
        focusDone: "专注完成",
        sad: "难过",
        sleeping: "睡觉"
      },
      petStateDescriptions: {
        idle: "没有提醒或专注任务时显示",
        sitting: "需要安静陪伴或占位时显示",
        happy: "点击宠物或完成小互动后显示",
        breakPrompt: "休息提醒弹出时显示",
        breakRunning: "强制离屏休息倒计时时显示",
        breakDone: "确认完成休息后显示",
        hydrationPrompt: "喝水提醒弹出时显示",
        drinking: "确认喝水后的短动画",
        hydrationDone: "喝水记录完成后显示",
        focusGuard: "专注模式进行中显示",
        focusAlert: "专注时命中分心规则显示",
        focusDone: "专注计时完成后显示",
        sad: "拒绝或忽略提醒时显示",
        sleeping: "长时间安静或休息状态显示"
      },
      reminders: "提醒",
      enableBreakReminder: "开启休息提醒",
      breakInterval: "休息间隔",
      breakRunDuration: "休息时长",
      enableHydrationReminder: "开启喝水提醒",
      hydrationInterval: "喝水间隔",
      tokenBalance: "Token 余量",
      enableTokenBalanceReminder: "开启 Token 余量提醒",
      tokenBalanceNeedsConfig: "请先填写 Base URL 和 API Key，才能开启提醒。",
      tokenBalanceHelp: "按设定间隔请求 New API，并在小狗气泡里显示剩余额度。",
      newApiBaseUrl: "New API Base URL",
      newApiBaseUrlPlaceholder: "https://api.example.com",
      newApiKey: "API Key",
      newApiKeyPlaceholder: "sk-...",
      newApiKeyHelp: "只保存在本机设置文件中，不会上传到其他地方。",
      tokenBalanceInterval: "提醒间隔",
      tokenBalanceIntervalHelp: "每次检查都会弹出一条气泡提醒。",
      tokenBalanceCheck: "立即检查",
      tokenBalanceCurrent: "当前余量",
      tokenBalanceChecking: "检查中…",
      tokenBalanceIdle: "还没有检查。",
      tokenBalanceUnconfigured: "请先填写 Base URL 和 API Key。",
      tokenBalanceOk: (percent: string, remaining: string) => `剩余 ${percent}（${remaining}）`,
      tokenBalanceUnlimited: "额度无限",
      tokenBalanceError: (message: string) => `检查失败：${message}`,
      tokenBalanceResetAt: (time: string) => `${time} 重置`,
      tokenBalanceCheckedAt: (time: string) => `上次检查：${time}`,
      tokenBalanceInvalidUrl: "Base URL 格式不正确。",
      customActions: "自定义动作",
      customActionsHelp: "添加动作并上传 GIF 后，右键宠物即可播放。",
      addCustomAction: "添加动作",
      customActionName: "动作名称",
      customActionNamePlaceholder: "例如：打招呼",
      customActionGif: "动作 GIF",
      noCustomActions: "还没有自定义动作。",
      removeCustomAction: (name: string) => `删除动作 ${name}`,
      newCustomAction: "新动作",
      deleteAction: "删除",
      schedule: "作息提醒",
      enableScheduleReminders: "开启作息提醒",
      scheduleHelp: "仅工作日生效；到点后小狗会弹气泡提醒，配了 GIF 就播放 GIF。",
      workStartTime: "上班时间",
      workEndTime: "下班时间",
      mealTimes: "吃饭时间",
      addMealTime: "添加时间",
      removeMealTime: (time: string) => `移除 ${time}`,
      scheduleGif: "提醒 GIF",
      workStartGif: "上班提醒 GIF",
      workEndGif: "下班提醒 GIF",
      mealGif: "吃饭提醒 GIF",
      defaultAnimation: "默认动画",
      focus: "专注",
      focusDuration: "专注时长",
      enableDistractionDetection: "开启分心检测",
      detectionGrace: "检测宽限时间",
      blockedApps: "屏蔽应用",
      blockedKeywords: "屏蔽关键词",
      today: "今日",
      breaks: "休息",
      waters: "喝水",
      focusMin: "专注",
      warnings: "分心",
      minuteUnit: "分钟",
      secondUnit: "秒",
      countUnit: "次",
      addListItem: "添加…",
      removeListItem: (entry: string) => `移除 ${entry}`,
      runtime: "运行状态",
      state: "状态",
      mode: "模式",
      reminder: "提醒",
      dog: "小狗",
      distraction: "分心检测",
      status: "状态",
      statusIdle: "未运行",
      statusWatching: "检测中",
      statusPermissionNeeded: "需要权限",
      statusUnsupported: "当前系统不支持",
      statusError: "检测异常",
      matched: "命中",
      app: "应用",
      checked: "检查时间",
      timers: "计时器",
      break: "休息",
      water: "喝水",
      focusEnd: "专注结束",
      updated: "更新",
      demo: "演示",
      demoBreak: "休息",
      demoWater: "喝水",
      demoFocusWarning: "分心提醒",
      demoHappy: "开心",
      resetToday: "重置今日",
      startFocus: "开始专注",
      stopFocus: "停止专注",
      diagnostics: "诊断信息",
      preloadUnavailable: "Preload 不可用",
      preloadCopy:
        "Electron preload 没有注入，桌宠控制接口暂时不可用。请重启 pnpm dev，或检查 preload 路径和 sandbox 设置。",
      off: "关闭",
      now: "现在",
      never: "从未",
      none: "无",
      visible: "显示",
      hidden: "隐藏",
      idle: "空闲",
      noActiveWindowTitle: "还没有捕获到当前窗口标题。",
      detectionOffHelp: "分心检测已关闭。开启后保存，即可预览当前活动窗口。",
      detectionWaitingHelp: "正在等待第一次活动窗口检查。",
      detectionPermissionHelp:
        "需要在系统设置里允许 PawPal 获取辅助功能权限（macOS），然后重启应用或重新开启分心检测。",
      detectionUnsupportedHelp: "当前系统暂不支持活动窗口检测，分心检测会保持关闭状态。",
      detectionErrorHelp: "活动窗口检测暂时失败。请检查权限后，重新开启分心检测或重启应用。",
      detectionPreviewHelp: "正在预览当前活动窗口。开始专注后，命中规则会触发分心提醒。",
      detectionFocusHelp: "专注期间正在检测。命中屏蔽应用或关键词会触发分心提醒。"
    },
    system: {
      unsupportedDistraction: "分心检测目前仅支持 macOS。"
    }
  },
  en: {
    bubble: {
      woof: ["woof!", "bark bark!", "arf~"],
      breakReminder: [
        "You've been sitting too long, walk for a minute!",
        "I wanna play with you~ walk for a minute!",
        "Sitting for so long… go walk for a minute!",
        "I wanna play! Walk for a minute~"
      ],
      breakDone: [
        "Yay! *tail wag*",
        "Yay yay yay I like you so much",
        "Happy!"
      ],
      breakRun: [
        (seconds: number) => `I still wanna play for ${seconds}s! Get away from the screen~`,
        (seconds: number) => `${seconds}s left, no sneaking back!`,
        (seconds: number) => `${seconds}s!`
      ],
      breakRunComplete: [
        "Done playing~ sitting back down with you",
        "I'm back! Was waiting for you~",
        "Break's over, all settled down~"
      ],
      breakIgnore: [
        "Okay… but I'll worry about you",
        "Hmm… you have to stand up next time",
        "Fine, I'll lie here and wait…"
      ],
      hydrationReminder: [
        "I'm a little thirsty… you should drink some water too?",
        "I want water! You have some too~",
        "*licks lips* …time for water~",
        "My bowl's empty! Where's your cup?"
      ],
      hydrationDone: [
        "*slurp slurp* ahh~",
        "All full!",
        "Woof, water's so good"
      ],
      focusStart: [
        (minutes: number) => `Okay, I'll keep watch for ${minutes} minutes!`,
        (minutes: number) => `Focus for ${minutes} minutes, I'm watching`
      ],
      focusWarning: [
        (rule: string) => `Hey, no ${rule}! We said we'd focus!`,
        (rule: string) => `I saw you open ${rule}~ come back!`,
        (rule: string) => `Stay away from ${rule}!`
      ],
      focusComplete: [
        "Focus time's up!",
        "Focus done! *tail wag*"
      ],
      focusCancelled: [
        "Okay, I'll keep you company for a bit",
        "All done! I'm lying down~"
      ],
      focusBack: [
        "Good, I'll keep watching~",
        "Mm! Back to work then",
        "I'll keep focusing too~"
      ],
      updateAvailable: [
        (version: string) => `Version ${version} is available. Want to see what's new?`,
        (version: string) => `PawPal has a new version: ${version}.`
      ],
      tokenBalance: [
        (percent: string, remaining: string, reset: string) =>
          reset
            ? `Token balance ${percent} left (${remaining}), resets ${reset}`
            : `Token balance ${percent} left (${remaining})`,
        (percent: string, remaining: string, reset: string) =>
          reset
            ? `Heads up: ${percent} left, about ${remaining}, refreshes ${reset}`
            : `Heads up: ${percent} left, about ${remaining}`,
        (percent: string, remaining: string, reset: string) =>
          reset
            ? `Only ${percent} of your tokens left, back ${reset}~`
            : `Only ${percent} of your tokens left~`
      ],
      tokenBalanceNoTotal: [
        (remaining: string) => `Token balance: ${remaining} left`,
        (remaining: string) => `Heads up: ${remaining} left`
      ],
      tokenBalanceUnlimited: [
        "Unlimited tokens, go wild~",
        "Unlimited quota, nothing to worry about"
      ],
      workStartReminder: [
        "Time to start work — let's go!",
        "Work time! I'll keep you company~"
      ],
      workEndReminder: [
        "You're off work! Great job today",
        "Work's over, pack up and head home~"
      ],
      mealReminder: [
        (time: string) => `It's ${time} — time to eat!`,
        (time: string) => `Meal time (${time}), don't go hungry~`
      ]
    },
    actions: {
      breakDone: "I stood up",
      breakRunDone: "I'm back",
      breakSnooze: "Remind in 10 min",
      breakMute: "Leave me today",
      hydrationDone: "I drank water",
      hydrationSnooze: "Remind later",
      focusBack: "Back to work",
      focusEnd: "End Focus"
    },
    menu: {
      showDog: "Show Pet",
      hideDog: "Hide Pet",
      startFocusMode: "Start Focus Mode",
      stopFocusMode: "Stop Focus Mode",
      customActions: "Custom Actions",
      unnamedAction: "Untitled action",
      demoBreakReminder: "Demo: Break Reminder",
      demoHydrationReminder: "Demo: Hydration Reminder",
      demoFocusWarning: "Demo: Distraction Nudge",
      demoHappyReaction: "Demo: Happy Reaction",
      settings: "Settings",
      resetToday: "Reset Today",
      quit: "Quit"
    },
    settings: {
      title: "Settings",
      welcomeTitle: "Welcome to PawPal",
      welcomeCopy:
        "PawPal lives in the menu bar and near the bottom of your screen. It reminds you to take breaks, drink water, and stay focused. Distraction detection is macOS-only and requires accessibility permissions.",
      dismissWelcome: "Got it",
      appearance: "Appearance",
      system: "System",
      launchAtLogin: "Launch at Login",
      launchAtLoginHelp:
        "Packaged macOS and Windows builds will start after login. Development builds only save the preference.",
      about: "About",
      version: "Version",
      releaseNotes: "Release Notes",
      openReleaseNotes: "Open Releases",
      updates: "Updates",
      checkForUpdates: "Check for Updates",
      checkingUpdates: "Checking…",
      updateCheckOnLaunch: "Check Updates on Launch",
      updateCheckOnLaunchHelp:
        "When enabled, PawPal checks the latest GitHub Release on startup. Otherwise it only checks when you ask.",
      updateIdle: "Updates have not been checked yet.",
      updateAvailable: (version: string) => `Version ${version} is available.`,
      updateCurrent: (version: string) => `You are on the latest version ${version}.`,
      updateError: (message: string) => `Update check failed: ${message}`,
      updateChecking: "Checking GitHub Releases…",
      latestVersion: (version: string) => `Latest version: ${version}`,
      quickActions: "Quick Actions",
      testTools: "Test Tools",
      language: "Language",
      petAppearance: "Pet",
      customPet: "Custom",
      customPetAssets: "Custom Assets",
      customPetRequirements:
        "GIF only; the default state asset is required and other states are optional; transparent backgrounds and consistent subject size are recommended",
      customPetReady: "Ready",
      customPetMissingRequired: "Default state asset required",
      customPetRequired: "Required",
      customPetOptional: "Optional",
      uploadGif: "Upload GIF",
      replaceGif: "Replace GIF",
      removeGif: "Remove",
      lineDogReference: "Line Dog Reference",
      referenceAsset: "Reference",
      petStates: {
        idle: "Idle",
        sitting: "Sitting",
        happy: "Happy",
        breakPrompt: "Break Prompt",
        breakRunning: "Break Running",
        breakDone: "Break Done",
        hydrationPrompt: "Water Prompt",
        drinking: "Drinking",
        hydrationDone: "Water Done",
        focusGuard: "Focus Guard",
        focusAlert: "Focus Alert",
        focusDone: "Focus Done",
        sad: "Sad",
        sleeping: "Sleeping"
      },
      petStateDescriptions: {
        idle: "Shown when no reminder or focus task is active",
        sitting: "Shown for quiet companionship or placeholder moments",
        happy: "Shown after pet clicks or small completed interactions",
        breakPrompt: "Shown when a break reminder appears",
        breakRunning: "Shown during the away-from-screen break countdown",
        breakDone: "Shown after the user confirms a break",
        hydrationPrompt: "Shown when a water reminder appears",
        drinking: "Short animation after the user logs water",
        hydrationDone: "Shown after water is recorded",
        focusGuard: "Shown while Focus mode is running",
        focusAlert: "Shown when a blocked app or keyword is detected",
        focusDone: "Shown after a focus session completes",
        sad: "Shown after reminders are refused or ignored",
        sleeping: "Shown during quiet or resting moments"
      },
      reminders: "Reminders",
      enableBreakReminder: "Enable Break Reminder",
      breakInterval: "Break Interval",
      breakRunDuration: "Break Duration",
      enableHydrationReminder: "Enable Hydration Reminder",
      hydrationInterval: "Hydration Interval",
      tokenBalance: "Token Balance",
      enableTokenBalanceReminder: "Enable Token Balance Reminder",
      tokenBalanceNeedsConfig: "Enter a Base URL and API Key first to enable reminders.",
      tokenBalanceHelp:
        "Checks your New API balance at the chosen interval and shows the remaining quota in a pet bubble.",
      newApiBaseUrl: "New API Base URL",
      newApiBaseUrlPlaceholder: "https://api.example.com",
      newApiKey: "API Key",
      newApiKeyPlaceholder: "sk-...",
      newApiKeyHelp: "Kept only in this app's local settings file and never uploaded elsewhere.",
      tokenBalanceInterval: "Reminder Interval",
      tokenBalanceIntervalHelp: "Every check also pops a bubble reminder.",
      tokenBalanceCheck: "Check Now",
      tokenBalanceCurrent: "Current Balance",
      tokenBalanceChecking: "Checking…",
      tokenBalanceIdle: "Not checked yet.",
      tokenBalanceUnconfigured: "Enter a Base URL and API Key first.",
      tokenBalanceOk: (percent: string, remaining: string) =>
        `${percent} left (${remaining})`,
      tokenBalanceUnlimited: "Unlimited quota",
      tokenBalanceError: (message: string) => `Check failed: ${message}`,
      tokenBalanceResetAt: (time: string) => `Resets ${time}`,
      tokenBalanceCheckedAt: (time: string) => `Last checked: ${time}`,
      tokenBalanceInvalidUrl: "Base URL is not valid.",
      customActions: "Custom Actions",
      customActionsHelp: "Add an action with a GIF, then play it from the pet's right-click menu.",
      addCustomAction: "Add Action",
      customActionName: "Action Name",
      customActionNamePlaceholder: "e.g. Say hi",
      customActionGif: "Action GIF",
      noCustomActions: "No custom actions yet.",
      removeCustomAction: (name: string) => `Remove action ${name}`,
      newCustomAction: "New action",
      deleteAction: "Delete",
      schedule: "Work & Meals",
      enableScheduleReminders: "Enable Work & Meal Reminders",
      scheduleHelp:
        "Weekdays only. At each time the pet shows a bubble, and plays the GIF if one is set.",
      workStartTime: "Work Start",
      workEndTime: "Work End",
      mealTimes: "Meal Times",
      addMealTime: "Add Time",
      removeMealTime: (time: string) => `Remove ${time}`,
      scheduleGif: "Reminder GIF",
      workStartGif: "Work Start GIF",
      workEndGif: "Work End GIF",
      mealGif: "Meal GIF",
      defaultAnimation: "Default animation",
      focus: "Focus",
      focusDuration: "Focus Duration",
      enableDistractionDetection: "Enable Distraction Detection",
      detectionGrace: "Detection Grace",
      blockedApps: "Blocked Apps",
      blockedKeywords: "Blocked Keywords",
      today: "Today",
      breaks: "Breaks",
      waters: "Waters",
      focusMin: "Focus",
      warnings: "Distractions",
      minuteUnit: "min",
      secondUnit: "s",
      countUnit: "",
      addListItem: "Add…",
      removeListItem: (entry: string) => `Remove ${entry}`,
      runtime: "Runtime",
      state: "State",
      mode: "Mode",
      reminder: "Reminder",
      dog: "Dog",
      distraction: "Distraction",
      status: "Status",
      statusIdle: "Idle",
      statusWatching: "Watching",
      statusPermissionNeeded: "Permission needed",
      statusUnsupported: "Unsupported",
      statusError: "Detection error",
      matched: "Matched",
      app: "App",
      checked: "Checked",
      timers: "Timers",
      break: "Break",
      water: "Water",
      focusEnd: "Focus End",
      updated: "Updated",
      demo: "Demo",
      demoBreak: "Break",
      demoWater: "Water",
      demoFocusWarning: "Distraction",
      demoHappy: "Happy",
      resetToday: "Reset Today",
      startFocus: "Start Focus",
      stopFocus: "Stop Focus",
      diagnostics: "Diagnostics",
      preloadUnavailable: "Preload unavailable",
      preloadCopy:
        "Electron preload was not injected, so the pet control API is unavailable. Restart pnpm dev, or check the preload path and sandbox settings.",
      off: "off",
      now: "now",
      never: "never",
      none: "none",
      visible: "visible",
      hidden: "hidden",
      idle: "idle",
      noActiveWindowTitle: "No active window title captured yet.",
      detectionOffHelp: "Detection is off. Enable it and Save to preview the active window.",
      detectionWaitingHelp: "Waiting for the first active-window check.",
      detectionPermissionHelp:
        "Allow PawPal accessibility permissions in System Settings (macOS), then restart the app or toggle detection again.",
      detectionUnsupportedHelp:
        "Active-window detection is not supported on this system yet, so distraction detection will stay inactive.",
      detectionErrorHelp:
        "Active-window detection failed. Check permissions, then toggle detection again or restart the app.",
      detectionPreviewHelp:
        "Previewing the active window. Start Focus to trigger distraction nudges from matched rules.",
      detectionFocusHelp:
        "Watching during Focus. Matched blocked apps or keywords will trigger a distraction nudge."
    },
    system: {
      unsupportedDistraction: "Distraction detection currently supports macOS only."
    }
  }
} as const;

export type I18nBundle = (typeof I18N)[Language];

export function i18n(language: Language): I18nBundle {
  return I18N[language];
}
