document.addEventListener('DOMContentLoaded', () => {
  const toast = document.querySelector('#toast');
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 3200);
  };

  const toolsGrid = document.querySelector('.tools-grid');
  if (toolsGrid) {
    const toolNames = ['Question', 'Oracle', 'Terminal', 'Clicker', 'View all'];
    const toolTabs = document.createElement('div');
    toolTabs.className = 'tool-tabs';
    toolTabs.setAttribute('role', 'tablist');
    toolTabs.setAttribute('aria-label', 'Playground tools');
    toolTabs.innerHTML = toolNames.map((name, index) => `<button class="tool-tab${index === 0 ? ' active' : ''}" role="tab" aria-selected="${index === 0}" data-tool="${index}">0${index + 1} / ${name}</button>`).join('');
    toolsGrid.before(toolTabs);
    const panels = [...toolsGrid.querySelectorAll('.tool-panel')];
    panels.forEach((panel, index) => { panel.classList.toggle('active', index === 0); panel.dataset.toolPanel = String(index); });
    toolTabs.addEventListener('click', (event) => {
      const tab = event.target.closest('.tool-tab');
      if (!tab) return;
      toolTabs.querySelectorAll('.tool-tab').forEach((item) => { item.classList.toggle('active', item === tab); item.setAttribute('aria-selected', String(item === tab)); });
      const showAll = tab.dataset.tool === '4';
      toolsGrid.classList.toggle('view-all', showAll);
      panels.forEach((panel) => panel.classList.toggle('active', showAll || panel.dataset.toolPanel === tab.dataset.tool));
    });
    const questionInput = document.createElement('input');
    questionInput.className = 'question-input';
    questionInput.id = 'questionInput';
    questionInput.value = 'can you be my date?';
    questionInput.setAttribute('aria-label', 'Question text');
    const questionText = document.querySelector('#questionText') || document.querySelector('.question-stage span');
    if (questionText) { questionText.textContent = questionInput.value; questionText.closest('.tool-panel').querySelector('.question-stage').before(questionInput); questionInput.addEventListener('input', () => { questionText.textContent = questionInput.value || ' '; }); }
  }

  document.querySelectorAll('.filters button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filters button').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      document.querySelectorAll('.project-card').forEach((card) => {
        card.hidden = button.dataset.filter !== 'all' && card.dataset.filter !== button.dataset.filter;
      });
    });
  });

  const doorGrid = document.querySelector('#doorGrid');
  for (let index = 1; doorGrid && index <= 12; index += 1) {
    const door = document.createElement('button');
    door.className = 'door';
    door.innerHTML = `<span class="door-number">DOOR_${String(index).padStart(2, '0')}</span><span class="door-knob"></span>`;
    door.addEventListener('click', () => {
      door.classList.toggle('open');
      const messages = ['A quiet room full of loud ideas.', 'You found a pixel hiding in plain sight.', 'This door leads to another door.', 'The void says: keep making.', 'Nothing here. Which is suspicious.'];
      const message = index === 7 ? 'EASTER EGG 01/05: You found the room behind the room.' : messages[index % messages.length];
      document.querySelector('#vaultMessage').textContent = message;
      if (index === 7) showToast('SECRET SIGNAL FOUND // 01 of 05');
    });
    doorGrid.appendChild(door);
  }

  const heroOrbit = document.querySelector('.hero-orbit');
  if (heroOrbit) {
    heroOrbit.addEventListener('click', () => showToast('EASTER EGG 02/05: Signal received. You have excellent instincts.'));
    heroOrbit.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') event.currentTarget.click(); });
  }

  const numberDisplay = document.querySelector('#randomNumber');
  const numberButton = document.querySelector('#numberBtn');
  if (numberButton) numberButton.addEventListener('click', () => { numberDisplay.textContent = Math.floor(Math.random() * 900) + 100; });

  const printButton = document.querySelector('#printBtn');
  if (printButton) printButton.addEventListener('click', () => {
    const input = document.querySelector('#terminalInput');
    document.querySelector('#terminalOutput').innerHTML += `<br /><span>printed:</span> ${input.value.replace(/[&<>]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[character]))}`;
    input.value = '';
  });

  const noButton = document.querySelector('#noBtn');
  const noMessages = ['Too slow.', 'Nice try.', 'The NO button has relocated.', 'It yearns to be free.'];
  if (noButton) {
    noButton.addEventListener('mouseenter', () => { noButton.style.transform = `translate(${Math.random() * 120 - 60}px, ${Math.random() * 70 - 35}px)`; document.querySelector('#questionStatus').textContent = noMessages[Math.floor(Math.random() * noMessages.length)]; });
    document.querySelector('#yesBtn').addEventListener('click', () => { document.querySelector('#questionStatus').textContent = 'Correct. You chose chaos. EASTER EGG 03/05.'; showToast('SECRET SIGNAL FOUND // 03 of 05'); });
  }

  let clicks = 0;
  let level = 0;
  const clickButton = document.querySelector('#clickButton');
  if (clickButton) {
    clickButton.addEventListener('click', () => { clicks += level + 1; document.querySelector('#clickCount').textContent = clicks; });
    document.querySelector('#upgradeButton').addEventListener('click', (event) => { if (clicks >= 10 + level * 15) { clicks -= 10 + level * 15; level += 1; event.currentTarget.querySelector('span').textContent = 10 + level * 15; document.querySelector('#upgradeStatus').textContent = `Level ${level} / +${level + 1} per click`; if (level === 1) showToast('EASTER EGG 04/05: The button believes in you.'); } else showToast(`Need ${10 + level * 15} clicks to upgrade.`); });
  }

  let logoClicks = 0;
  document.querySelector('#logoSecret').addEventListener('click', () => { logoClicks += 1; if (logoClicks === 5) { showToast('EASTER EGG 05/05: SYSTEM LOG COMPLETE. Welcome, Jonathan.'); logoClicks = 0; } });
});