import React, { useState, useMemo, useCallback, useId } from 'react';
import { Plus, X, TrendingUp, DollarSign, BarChart, Bitcoin, Briefcase, RotateCcw } from 'lucide-react';
import styles from './SimuladorEmprestimo.module.css';

// --- Constants ---

const MOCK_PRICES_BRL = {
  BTC: 345000.75,
  ETH: 18200.40,
  USDT: 5.21,
};

const LTV_RATE = 0.35; // 35% Loan-to-Value
const FEE_RATE = 0.02; // 2% fee

const ASSET_DEFINITIONS = {
  BTC: { name: 'Bitcoin', icon: (props) => <Bitcoin {...props} /> },
  ETH: { name: 'Ethereum', icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l6 10-6 10-6-10 6-10z"/><path d="M12 2v10m0 10v-10m0 0l6-10m-6 10l-6-10"/></svg> },
  USDT: { name: 'USDT', icon: (props) => <DollarSign {...props} /> },
};

// --- Helper Functions ---

const sanitizeNumericInput = (raw) => {
  if (raw == null) return '';
  const value = String(raw);
  return value.replace(/[^\d.,]/g, '');
};

const parseSafeFloat = (value) => {
  if (typeof value !== 'string') {
    value = String(value);
  }
  const normalized = value.trim();
  if (!normalized) return 0;
  const hasComma = normalized.includes(',');
  const cleaned = hasComma ? normalized.replace(/\./g, '').replace(',', '.') : normalized.replace(/,/g, '.');
  const safe = cleaned.replace(/[^\d.]/g, '');
  const parsed = parseFloat(safe);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatInputBRL = (value) => {
  const n = parseSafeFloat(value);
  if (n === 0) return '';
  return n.toFixed(2).replace('.', ',');
};

const formatInputQuantity = (value) => {
  const n = parseSafeFloat(value);
  if (n === 0) return '';
  return n.toFixed(8).replace('.', ',');
};

const formatBRL = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0);
};

const generateId = () => {
  const cryptoObj = globalThis?.crypto;
  if (cryptoObj && typeof cryptoObj.randomUUID === 'function') {
    return cryptoObj.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const formatUSD = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value || 0);
};

const formatQuantity = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 8,
    minimumFractionDigits: 2,
  }).format(value || 0);
};

// --- Sub-Components ---

const AssetSelectorModal = React.memo(({ onSelect, onCancel, addedAssetKeys }) => {
  const availableAssets = Object.keys(ASSET_DEFINITIONS).filter(
    (assetKey) => !addedAssetKeys.has(assetKey)
  );

  return (
    <div className={styles.modalOverlay} onClick={onCancel} role="presentation">
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} role="presentation">
        <button
          onClick={onCancel}
          className={styles.modalCloseButton}
          aria-label="Fechar modal"
        >
          <X size={20} />
        </button>
        <h3 className={styles.modalTitle}>
          Adicionar Ativo de Garantia
        </h3>
        <div className={styles.assetList}>
          {availableAssets.length === 0 ? (
            <p className={styles.emptyStateText}>Todos os ativos já foram adicionados.</p>
          ) : (
            availableAssets.map((assetKey) => {
              const asset = ASSET_DEFINITIONS[assetKey];
              const Icon = asset.icon;

              return (
                <button
                  key={assetKey}
                  onClick={() => onSelect(assetKey)}
                  className={styles.assetButton}
                >
                  <div className={styles.assetIconWrapper}>
                    <Icon className={styles.assetIcon} />
                  </div>
                  <div>
                    <div className={styles.assetName}>{asset.name}</div>
                    <div className={styles.assetKey}>{assetKey}</div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
});

const CollateralCard = React.memo(({ assetItem, onUpdateAsset, onRemoveAsset }) => {
  const { id, asset: assetKey, inputType, value } = assetItem;
  const priceBRL = MOCK_PRICES_BRL[assetKey];
  const assetInfo = ASSET_DEFINITIONS[assetKey];
  const Icon = assetInfo.icon;
  const primaryInputId = useId();
  const secondaryInputId = useId();
  const numericValue = parseSafeFloat(value);
  const quantity = inputType === 'quantity' ? numericValue : numericValue / priceBRL;
  const brlValue = inputType === 'brl' ? numericValue : numericValue * priceBRL;

  const handleValueChange = (e) => {
    onUpdateAsset(id, { value: sanitizeNumericInput(e.target.value) });
  };

  const setInputType = (newType) => {
    if (newType === inputType) return;
    const newValue = newType === 'brl'
      ? brlValue.toFixed(2)
      : quantity.toFixed(8);
    onUpdateAsset(id, {
      inputType: newType,
      value: newValue.replace('.', ','),
    });
  };

  const handleBlur = () => {
    onUpdateAsset(id, { value: inputType === 'brl' ? formatInputBRL(value) : formatInputQuantity(value) });
  };

  return (
    <div className={styles.collateralCard}>
      <div className={styles.cardHeader}>
        <div className={styles.assetInfo}>
          <Icon className={styles.assetIconLarge} />
          <span className={styles.assetTitle}>{assetInfo.name} ({assetKey})</span>
        </div>
        <button
          onClick={() => onRemoveAsset(id)}
          className={styles.removeButton}
          aria-label={`Remover ${assetInfo.name}`}
        >
          <X size={20} />
        </button>
      </div>
      <div className={styles.toggleContainer}>
        <button
          onClick={() => setInputType('quantity')}
          className={`${styles.toggleButton} ${
            inputType === 'quantity' ? styles.toggleButtonActive : ''
          }`}
        >
          Quantidade
        </button>
        <button
          onClick={() => setInputType('brl')}
          className={`${styles.toggleButton} ${
            inputType === 'brl' ? styles.toggleButtonActive : ''
          }`}
        >
          Valor (BRL)
        </button>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor={primaryInputId} className={styles.inputLabel}>
            {inputType === 'quantity' ? 'Quantidade' : 'Valor (BRL)'}
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputAdornment}>
              {inputType === 'quantity' ? assetKey : 'R$'}
            </span>
            <input
              id={primaryInputId}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={value}
              onChange={handleValueChange}
              onBlur={handleBlur}
              placeholder="0,00"
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor={secondaryInputId} className={styles.inputLabel}>
            {inputType === 'quantity' ? 'Valor (BRL) Equivalente' : 'Quantidade Equivalente'}
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputAdornment}>
              {inputType === 'quantity' ? 'R$' : assetKey}
            </span>
            <input
              id={secondaryInputId}
              type="text"
              readOnly
              value={inputType === 'quantity' ? formatBRL(brlValue) : formatQuantity(quantity)}
              className={styles.inputFieldReadOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

const LoanSummaryCard = React.memo(({ totalCollateralBRL }) => {
  const { loanableAmount, fee, finalLoanAmount } = useMemo(() => {
    const loanableAmount = totalCollateralBRL * LTV_RATE;
    const fee = loanableAmount * FEE_RATE;
    const finalLoanAmount = loanableAmount - fee;
    return { loanableAmount, fee, finalLoanAmount };
  }, [totalCollateralBRL]);

  return (
    <div className={styles.summaryCard}>
      <h3 className={styles.cardTitle}>
        <TrendingUp className={styles.titleIcon} />
        Estimativa do Empréstimo
      </h3>
      <div className={styles.summaryDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Total Garantia:</span>
          <span className={styles.detailValue}>{formatBRL(totalCollateralBRL)}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>LTV (Taxa):</span>
          <span className={styles.detailValue}>{LTV_RATE * 100}%</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Valor Máx. Empréstimo:</span>
          <span className={styles.detailValue}>{formatBRL(loanableAmount)}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Taxa de Abertura (2%):</span>
          <span className={styles.detailValueFee}>-{formatBRL(fee)}</span>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Você Recebe (R$):</span>
          <span className={styles.totalValueGreen}>{formatBRL(finalLoanAmount)}</span>
        </div>
      </div>
    </div>
  );
});

const RequiredCollateralCard = React.memo(() => {
  const [desiredLoanBRL, setDesiredLoanBRL] = useState('');
  const reverseInputId = useId();

  const { requiredCollateralBRL, requiredCollateralUSD } = useMemo(() => {
    const loan = parseSafeFloat(desiredLoanBRL);
    if (loan === 0) {
      return { requiredCollateralBRL: 0, requiredCollateralUSD: 0 };
    }
    const requiredTotalLoanable = loan / (1 - FEE_RATE);
    const reqCollateralBRL = requiredTotalLoanable / LTV_RATE;
    const usdRate = MOCK_PRICES_BRL.USDT; 
    const reqCollateralUSD = reqCollateralBRL / usdRate;
    return { requiredCollateralBRL: reqCollateralBRL, requiredCollateralUSD: reqCollateralUSD };
  }, [desiredLoanBRL]);

  return (
    <div className={styles.summaryCard}>
      <h3 className={styles.cardTitle}>
        <BarChart className={styles.titleIcon} />
        Calcular Garantia Necessária
      </h3>
      <div className={styles.content}>
        <div className={styles.inputGroup}>
          <label htmlFor={reverseInputId} className={styles.inputLabel}>
            Quanto você quer pegar (R$)?
          </label>
          <div className={styles.inputWrapper}>
            <span className={styles.inputAdornment}>R$</span>
            <input
              id={reverseInputId}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={desiredLoanBRL}
              onChange={(e) => setDesiredLoanBRL(sanitizeNumericInput(e.target.value))}
              onBlur={() => setDesiredLoanBRL(formatInputBRL(desiredLoanBRL))}
              placeholder="50000,00"
              className={styles.inputField}
            />
          </div>
        </div>
        <div className={`${styles.separator} ${styles.marginTop}`}></div>
        <div className={styles.resultsContainer}>
          <p className={styles.infoText}>Você precisará de (aprox.):</p>
          <div className={styles.detailRow}>
            <span className={styles.detailValue}>Em Garantia (R$):</span>
            <span className={styles.detailValueBlue}>{formatBRL(requiredCollateralBRL)}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailValue}>Em Garantia (USD):</span>
            <span className={styles.detailValueBlue}>{formatUSD(requiredCollateralUSD)}</span>
          </div>
        </div>
      </div>
    </div>
  );
});


// --- Main App Component ---

export default function SimuladorEmprestimo() {
  const [collateralAssets, setCollateralAssets] = useState([]);
  const [isAddingAsset, setIsAddingAsset] = useState(false);

  const handleAddAsset = useCallback((assetKey) => {
    const newAsset = {
      id: generateId(),
      asset: assetKey,
      inputType: 'quantity',
      value: '0',
    };
    setCollateralAssets((prevAssets) => [...prevAssets, newAsset]);
    setIsAddingAsset(false);
  }, []);

  const handleUpdateAsset = useCallback((id, newValues) => {
    setCollateralAssets(prevAssets =>
      prevAssets.map(asset =>
        asset.id === id ? { ...asset, ...newValues } : asset
      )
    );
  }, []);

  const handleRemoveAsset = useCallback((id) => {
    setCollateralAssets(prevAssets => prevAssets.filter(asset => asset.id !== id));
  }, []);

  const handleReset = useCallback(() => {
    setCollateralAssets([]);
    setIsAddingAsset(false);
  }, []);

  const totalCollateralBRL = useMemo(() => {
    return collateralAssets.reduce((total, assetItem) => {
      const { asset, inputType, value } = assetItem;
      const priceBRL = MOCK_PRICES_BRL[asset];
      const numericValue = parseSafeFloat(value);
      const brlValue = inputType === 'brl'
        ? numericValue
        : numericValue * priceBRL;
      return total + brlValue;
    }, 0);
  }, [collateralAssets]);

  const addedAssetKeys = useMemo(() => {
    return new Set(collateralAssets.map(asset => asset.asset));
  }, [collateralAssets]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.maxWidthWrapper}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.mainTitle}>
              <Briefcase className={styles.mainTitleIcon} size={36} />
              Simulador de Empréstimo Cripto
            </h1>
            <button type="button" className={styles.resetButton} onClick={handleReset} disabled={collateralAssets.length === 0}>
              <RotateCcw size={18} />
              Limpar
            </button>
          </div>
          <p className={styles.subtitle}>Calcule quanto você pode pegar de empréstimo usando seus ativos digitais como garantia.</p>
        </div>

        {/* Main Layout Grid */}
        <div className={styles.layoutGrid}>

          {/* Left Column: Collateral Input */}
          <div className={styles.leftColumn}>
            <h2 className={styles.columnTitle}>
              1. Adicione sua Garantia
            </h2>
            
            {collateralAssets.length === 0 && (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateText}>Nenhum ativo adicionado.</p>
                <p className={styles.emptyStateText}>Clique no botão abaixo para começar.</p>
              </div>
            )}

            {collateralAssets.map((assetItem) => (
              <CollateralCard
                key={assetItem.id}
                assetItem={assetItem}
                onUpdateAsset={handleUpdateAsset}
                onRemoveAsset={handleRemoveAsset}
              />
            ))}

            <button
              onClick={() => setIsAddingAsset(true)}
              className={styles.addButton}
            >
              <Plus size={20} />
              Adicionar Ativo
            </button>
          </div>

          {/* Right Column: Summary & Reverse Calc (Sticky) */}
          <div className={styles.rightColumn}>
            <div className={styles.rightColumnSection}>
              <h2 className={styles.columnTitle}>
                2. Veja sua Estimativa
              </h2>
              <LoanSummaryCard totalCollateralBRL={totalCollateralBRL} />
            </div>

            {/* --- CHANGE HERE --- */}
            {/* Only show section 3 if at least one asset has been added */}
            {collateralAssets.length > 0 && (
              <div className={styles.rightColumnSection}>
                <h2 className={styles.columnTitle}>
                  3. Ou...
                </h2>
                <RequiredCollateralCard />
              </div>
            )}
            {/* --- END OF CHANGE --- */}

          </div>
        </div>
      </div>

      {/* Asset Selection Modal */}
      {isAddingAsset && (
        <AssetSelectorModal
          onSelect={handleAddAsset}
          onCancel={() => setIsAddingAsset(false)}
          addedAssetKeys={addedAssetKeys}
        />
      )}
    </div>
  );
}
